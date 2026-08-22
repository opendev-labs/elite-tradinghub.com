import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser
} from 'firebase/auth'
import {
  getDatabase, ref, onValue, push, set, update, remove, serverTimestamp
} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyC8rSV-uGq27soAgzdjgV0ONlBZQyexmaY",
  authDomain: "elite-tradinghubs-office.firebaseapp.com",
  projectId: "elite-tradinghubs-office",
  storageBucket: "elite-tradinghubs-office.firebasestorage.app",
  messagingSenderId: "116492878256",
  appId: "1:116492878256:web:43132bcb5b5a5232301675",
  measurementId: "G-L5J86Q4T62",
  databaseURL: "https://elite-tradinghubs-office-default-rtdb.firebaseio.com"
}

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db   = getDatabase(app)

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

// ── RTDB Helper Functions ──────────────────────────────────────────────────
export function subscribeRtdbData<T = any>(path: string, callback: (data: T | null) => void) {
  const dbRef = ref(db, path)
  return onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val() as T)
    } else {
      callback(null)
    }
  }, (err) => {
    console.error(`RTDB subscription error at ${path}:`, err)
    callback(null)
  })
}

export async function writeRtdbData(path: string, data: any) {
  const dbRef = ref(db, path)
  await set(dbRef, data)
}

export async function pushRtdbData(path: string, data: any) {
  const dbRef = ref(db, path)
  const newRef = push(dbRef)
  await set(newRef, { ...data, createdAt: Date.now() })
  return newRef.key
}

export async function updateRtdbData(path: string, data: any) {
  const dbRef = ref(db, path)
  await update(dbRef, data)
}

export async function deleteRtdbData(path: string) {
  const dbRef = ref(db, path)
  await remove(dbRef)
}


export interface UserSessionData {
  name: string
  email: string | null
  image: string | null
  uid: string
}

export function getStoredUser(): UserSessionData | null {
  if (typeof window === 'undefined') return null
  try {
    const data = localStorage.getItem('eth_user_session')
    return data ? JSON.parse(data) : null
  } catch (e) {
    return null
  }
}

export function setStoredUser(user: UserSessionData | null) {
  if (typeof window === 'undefined') return
  try {
    if (user) {
      localStorage.setItem('eth_user_session', JSON.stringify(user))
    } else {
      localStorage.removeItem('eth_user_session')
    }
  } catch (e) {
    console.error('Failed to update local session cache:', e)
  }
}

export function formatTimeAgo(timestamp: number | string | undefined | null): string {
  if (!timestamp) return 'Just now'
  
  let time: number
  if (typeof timestamp === 'number') {
    time = timestamp
  } else if (typeof timestamp === 'string') {
    const parsed = Date.parse(timestamp)
    if (!isNaN(parsed)) {
      time = parsed
    } else {
      return timestamp
    }
  } else {
    return 'Just now'
  }

  const seconds = Math.floor((Date.now() - time) / 1000)
  if (seconds < 30) return 'Just now'
  if (seconds < 60) return `${seconds}s ago`
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  
  return new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export async function syncUserToRtdb(user: UserSessionData, isExplicitLogin = false) {
  try {
    const now = Date.now()
    const userRecord = {
      id: user.uid,
      name: user.name,
      email: user.email,
      role: 'Client',
      team: 'Trading Platform',
      workspace: 'PRO',
      status: 'Active',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastActive: now,
      color: 'bg-emerald-500/20 text-emerald-300',
    }

    const googleRecord = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      photoURL: user.image || '',
      provider: 'Google OAuth 2.0',
      lastLogin: now,
      lastLoginFormatted: new Date(now).toLocaleString(),
      status: 'Active',
    }

    await updateRtdbData(`users/${user.uid}`, userRecord)
    await updateRtdbData(`clients/${user.uid}`, {
      id: `ETH-${user.uid.slice(0, 5).toUpperCase()}`,
      name: user.name,
      email: user.email,
      plan: 'PRO',
      status: 'ACTIVE',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      online: true,
      lastActive: now,
    })
    await updateRtdbData(`google_logins/${user.uid}`, googleRecord)

    if (isExplicitLogin) {
      await pushRtdbData(`activity`, {
        user: user.name,
        action: `Logged in via Google (${user.email})`,
        time: now,
        timestamp: now,
      })
    }
  } catch (e) {
    console.error('Failed to sync user to RTDB:', e)
  }
}

export async function trackPageView(pagePath: string) {
  try {
    if (typeof window === 'undefined') return
    await pushRtdbData(`analytics/pageviews`, {
      path: pagePath,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
    })
  } catch (e) {
    console.error('Failed to track page view:', e)
  }
}

export async function checkGoogleRedirectResult(): Promise<UserSessionData | null> {
  if (typeof window === 'undefined') return null
  try {
    const result = await getRedirectResult(auth)
    if (result?.user) {
      const userData: UserSessionData = {
        name: result.user.displayName || 'Pro Trader',
        email: result.user.email,
        image: result.user.photoURL,
        uid: result.user.uid,
      }
      setStoredUser(userData)
      await syncUserToRtdb(userData, true)
      return userData
    }
  } catch (err) {
    console.error('Firebase Redirect Auth Error:', err)
  }
  return null
}

export async function signInWithGoogleFirebase() {
  try {
    const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) {
      await signInWithRedirect(auth, googleProvider)
      return { user: null, redirecting: true, error: null }
    }
    const result = await signInWithPopup(auth, googleProvider)
    const userData: UserSessionData = {
      name: result.user.displayName || 'Pro Trader',
      email: result.user.email,
      image: result.user.photoURL,
      uid: result.user.uid,
    }
    setStoredUser(userData)
    await syncUserToRtdb(userData, true)
    return { user: userData, redirecting: false, error: null }
  } catch (err: any) {
    console.error('Firebase Google Popup Error (Fallback to Redirect):', err)
    try {
      await signInWithRedirect(auth, googleProvider)
      return { user: null, redirecting: true, error: null }
    } catch (redirectErr: any) {
      return { user: null, redirecting: false, error: redirectErr.message || 'Google Sign-In failed' }
    }
  }
}

export async function logoutFirebase() {
  try {
    const stored = getStoredUser()
    if (stored?.uid) {
      updateRtdbData(`clients/${stored.uid}`, { online: false }).catch(() => {})
    }
    setStoredUser(null)
    await firebaseSignOut(auth)
  } catch (err) {
    console.error('Firebase Logout Error:', err)
  }
}

export function subscribeFirebaseUser(onChange: (user: UserSessionData | null) => void) {
  return onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
    if (fbUser) {
      const userData: UserSessionData = {
        name: fbUser.displayName || 'Pro Trader',
        email: fbUser.email,
        image: fbUser.photoURL,
        uid: fbUser.uid,
      }
      setStoredUser(userData)
      syncUserToRtdb(userData)
      onChange(userData)
    } else {
      setStoredUser(null)
      onChange(null)
    }
  })
}

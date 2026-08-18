import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut,
  onAuthStateChanged, User as FirebaseUser
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC8rSV-uGq27soAgzdjgV0ONlBZQyexmaY",
  authDomain: "elite-tradinghubs-office.firebaseapp.com",
  projectId: "elite-tradinghubs-office",
  storageBucket: "elite-tradinghubs-office.firebasestorage.app",
  messagingSenderId: "116492878256",
  appId: "1:116492878256:web:43132bcb5b5a5232301675",
  measurementId: "G-L5J86Q4T62"
}

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

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

export async function signInWithGoogleFirebase() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const userData: UserSessionData = {
      name: result.user.displayName || 'Pro Trader',
      email: result.user.email,
      image: result.user.photoURL,
      uid: result.user.uid,
    }
    setStoredUser(userData)
    return { user: userData, error: null }
  } catch (err: any) {
    console.error('Firebase Google Sign-In Error:', err)
    return { user: null, error: err.message || 'Google Sign-In failed' }
  }
}

export async function logoutFirebase() {
  try {
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
      onChange(userData)
    } else {
      setStoredUser(null)
      onChange(null)
    }
  })
}

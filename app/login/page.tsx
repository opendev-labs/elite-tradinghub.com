import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Crosshair } from 'lucide-react'
import { AuthPortal } from '@/components/auth-portal'

export default function LoginPage() {
  return (
    <div className="login-fullscreen-wrapper">
      {/* Top Left Navigation Back Button */}
      <header className="login-top-bar">
        <Link href="/" className="back-to-site-btn">
          <ArrowLeft size={16} /> Back to Elite Trading Hub
        </Link>
        
        <div className="login-brand-tag">
          <img src="/only-bull-head-icon.png" alt="Elite Trading Hub Logo" className="login-bull-icon" />
          <span>ELITE<b>TRADING</b><em>HUB</em></span>
        </div>
      </header>

      {/* Main Auth Portal */}
      <div className="login-body-center">
        <AuthPortal />
      </div>
    </div>
  )
}

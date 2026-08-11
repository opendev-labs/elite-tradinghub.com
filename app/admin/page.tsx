import { PageFrame } from '@/components/site-shell'
import { AuthPortal } from '@/components/auth-portal'

export default function AdminPage() {
  return (
    <PageFrame>
      <main className="admin-page-container">
        <AuthPortal />
      </main>
    </PageFrame>
  )
}

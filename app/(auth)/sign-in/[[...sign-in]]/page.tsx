import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-brand__eyebrow">Grupo Azimute</span>
          <strong className="auth-brand__title">Dashboard</strong>
        </div>
        <SignIn routing="path" path="/sign-in" />
      </div>
    </main>
  )
}

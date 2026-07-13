import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-brand__eyebrow">Grupo Azimute</span>
          <strong className="auth-brand__title">Dashboard</strong>
        </div>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </div>
    </main>
  )
}

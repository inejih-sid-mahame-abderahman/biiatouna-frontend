import LoginForm from '@/components/loginform'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-green-50 to-white">
      <section className="min-h-screen px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  )
}

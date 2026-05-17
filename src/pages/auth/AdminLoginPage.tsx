import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - just redirect to dashboard
    localStorage.setItem("accessToken", "mock-token")
    navigate("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌿</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">لوحة إدارة بيئتنا</h2>
              <p className="text-gray-500 mt-1">تسجيل الدخول للوصول إلى لوحة التحكم</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@biiatouna.mr"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
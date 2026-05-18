import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'

import { loginUser, registerUser } from '@/lib/api'

type AuthMode = 'login' | 'signup'

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const data = error.response?.data
    if (typeof data?.detail === 'string' && data.detail.trim()) {
      return data.detail
    }
    if (typeof data === 'object' && data !== null) {
      const firstValue = Object.values(data)[0]
      if (Array.isArray(firstValue) && typeof firstValue[0] === 'string') {
        return firstValue[0]
      }
      if (typeof firstValue === 'string') {
        return firstValue
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}

export default function LoginForm() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    loginIdentifier: '',
    loginPassword: '',
    signupName: '',
    signupEmail: '',
    signupPhoneNumber: '',
    signupPassword: '',
    signupConfirmPassword: '',
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const auth = await loginUser({
        identifier: formData.loginIdentifier,
        password: formData.loginPassword,
      })
      navigate(auth.user.is_staff ? '/admin/dashboard' : '/dashboard')
    } catch (error) {
      setError(getErrorMessage(error, 'تعذر تسجيل الدخول. تحقق من اسم المستخدم أو البريد أو رقم الهاتف وكلمة المرور.'))
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (formData.signupPassword !== formData.signupConfirmPassword) {
      setError('كلمتا المرور غير متطابقتين.')
      return
    }

    setLoading(true)

    try {
      await registerUser({
        name: formData.signupName,
        email: formData.signupEmail,
        phone_number: formData.signupPhoneNumber,
        password: formData.signupPassword,
      })
      navigate('/dashboard')
    } catch (error) {
      setError(getErrorMessage(error, 'تعذر إنشاء الحساب.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col-reverse md:flex-row bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden" dir="rtl">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-600 to-green-700 items-center justify-center p-8 text-white">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🌿</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">بيئتنا</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            سجل دخولك أو أنشئ حسابا لإرسال البلاغات البيئية ومتابعتها.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-10">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {mode === 'login' ? 'مرحبا بعودتك' : 'أنشئ حسابك'}
          </h2>
          <p className="text-gray-600 mb-10 text-base leading-7">
            {mode === 'login'
              ? 'يمكنك تسجيل الدخول باسم المستخدم أو البريد الإلكتروني أو رقم الهاتف.'
              : 'أنشئ حساب مستخدم جديدا لبدء إرسال البلاغات.'}
          </p>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  اسم المستخدم أو البريد أو الهاتف
                </label>
                <input
                  type="text"
                  name="loginIdentifier"
                  value={formData.loginIdentifier}
                  onChange={handleInputChange}
                  placeholder="أدخل اسم المستخدم أو البريد أو رقم الهاتف"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    placeholder="أدخل كلمة المرور"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white font-semibold py-3.5 rounded-xl hover:bg-green-600 transition active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'جار تسجيل الدخول...' : 'تسجيل الدخول'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="signupName"
                  value={formData.signupName}
                  onChange={handleInputChange}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="signupEmail"
                  value={formData.signupEmail}
                  onChange={handleInputChange}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="signupPhoneNumber"
                  value={formData.signupPhoneNumber}
                  onChange={handleInputChange}
                  placeholder="أدخل رقم هاتفك"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="signupPassword"
                    value={formData.signupPassword}
                    onChange={handleInputChange}
                    placeholder="أدخل كلمة المرور"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="signupConfirmPassword"
                    value={formData.signupConfirmPassword}
                    onChange={handleInputChange}
                    placeholder="أعد إدخال كلمة المرور"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white font-semibold py-3.5 rounded-xl hover:bg-green-600 transition active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'جار إنشاء الحساب...' : 'إنشاء حساب'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

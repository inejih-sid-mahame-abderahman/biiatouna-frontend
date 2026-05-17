import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [currentPage, setCurrentPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
    signupEmail: "",
    signupPassword: "",
    signupConfirmPassword: "",
    signupName: "",
    forgotEmail: "",
    resetEmail: "",
    resetToken: "",
    resetPassword: "",
    resetConfirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) return 0;
    if (password.length < 8) return 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password))
      return 3;
    return 2;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData((prev) => ({ ...prev, signupPassword: password }));
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      // Add your login logic here
      console.log("Login:", formData.loginEmail);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      setLoginError("خطأ في تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSignupError("");

    if (formData.signupPassword !== formData.signupConfirmPassword) {
      setSignupError("كلمات المرور غير متطابقة");
      setLoading(false);
      return;
    }

    if (passwordStrength < 2) {
      setSignupError("كلمة المرور ضعيفة جدًا");
      setLoading(false);
      return;
    }

    try {
      // Add your signup logic here
      console.log("Signup:", formData.signupEmail);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      setSignupError("خطأ في إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your forgot password logic here
      console.log("Forgot password:", formData.forgotEmail);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your reset password logic here
      console.log("Reset password:", formData.resetEmail);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col-reverse md:flex-row bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-600 to-green-700 items-center justify-center p-8 text-white">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🌿</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">بيئتنا</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            منصة موثوقة للإبلاغ عن المشاكل البيئية وحلها معًا
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8">
        {currentPage === "login" && (
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              تسجيل الدخول
            </h2>
            <p className="text-gray-600 mb-8">أدخل بيانات حسابك للمتابعة</p>

            {loginError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="loginEmail"
                  value={formData.loginEmail}
                  onChange={handleInputChange}
                  placeholder="أدخل بريدك الإلكتروني"
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
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    placeholder="أدخل كلمة المرور"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "جاري التحميل..." : "تسجيل الدخول"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                ليس لديك حساب؟{" "}
                <button
                  onClick={() => setCurrentPage("signup")}
                  className="text-green-500 hover:text-green-600 font-semibold transition"
                >
                  إنشاء حساب جديد
                </button>
              </p>
              <p className="mt-3">
                <button
                  onClick={() => setCurrentPage("forgot-password")}
                  className="text-gray-500 hover:text-gray-700 font-semibold transition"
                >
                  هل نسيت كلمة المرور؟
                </button>
              </p>
            </div>
          </div>
        )}

        {currentPage === "signup" && (
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              إنشاء حساب
            </h2>
            <p className="text-gray-600 mb-8">انضم إلى مجتمع بيئتنا</p>

            {signupError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {signupError}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    name="signupPassword"
                    value={formData.signupPassword}
                    onChange={handlePasswordChange}
                    placeholder="أدخل كلمة المرور"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      passwordStrength === 0
                        ? "w-0"
                        : passwordStrength === 1
                          ? "w-1/3 bg-red-500"
                          : passwordStrength === 2
                            ? "w-2/3 bg-yellow-500"
                            : "w-full bg-green-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="signupConfirmPassword"
                    value={formData.signupConfirmPassword}
                    onChange={handleInputChange}
                    placeholder="أكد كلمة المرور"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                هل لديك حساب بالفعل؟{" "}
                <button
                  onClick={() => setCurrentPage("login")}
                  className="text-green-500 hover:text-green-600 font-semibold transition"
                >
                  تسجيل الدخول
                </button>
              </p>
            </div>
          </div>
        )}

        {currentPage === "forgot-password" && (
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              استرجاع كلمة المرور
            </h2>
            <p className="text-gray-600 mb-8">
              أدخل بريدك الإلكتروني لاستلام رابط الاستعادة
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="forgotEmail"
                  value={formData.forgotEmail}
                  onChange={handleInputChange}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                <button
                  onClick={() => setCurrentPage("login")}
                  className="text-green-500 hover:text-green-600 font-semibold transition"
                >
                  العودة إلى تسجيل الدخول
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
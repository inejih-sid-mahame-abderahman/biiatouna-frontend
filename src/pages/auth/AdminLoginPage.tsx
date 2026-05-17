import LoginForm from "@/components/loginform";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🌿</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-800">بيئتنا</h1>
              <p className="text-xs text-green-600">
                معًا من أجل موريتانيا أنظف
              </p>
            </div>
          </button>
          <button
            onClick={() => navigate("/report")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            أبلغ الآن
          </button>
        </div>
      </nav>

      {/* Login Section */}
      <section className="pt-20 pb-16 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}
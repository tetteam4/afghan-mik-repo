import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success("لینک بازنشانی رمز عبور به ایمیل شما ارسال شد.");
    } catch (error) {
      toast.error(error.message || "خطا در ارسال لینک بازنشانی.");
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: 'url("/on/1.jpg")', // Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      dir="rtl" // RTL direction for Persian
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Forgot Password Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 relative z-10 border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          بازیابی رمز عبور
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              لطفاً آدرس ایمیل خود را وارد کنید تا لینک بازنشانی رمز عبور برای
              شما ارسال شود.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="آدرس ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "ارسال لینک بازنشانی"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              اگر حسابی با ایمیل {email} وجود داشته باشد، لینک بازنشانی رمز عبور
              برای شما ارسال خواهد شد.
            </p>
          </div>
        )}

        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <Link
            to={"/login"}
            className="text-sm text-cyan-400 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 ml-2" /> بازگشت به صفحه ورود
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default ForgotPasswordPage;

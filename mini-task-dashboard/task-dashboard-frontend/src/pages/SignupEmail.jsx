import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail } from "lucide-react";

import API from "../services/api";

const SignupEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/api/auth/send-otp",
        {
          email,
        }
      );

      alert(
        response?.data?.message ||
          "OTP sent successfully"
      );

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (err) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-pink-700">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 w-full max-w-md shadow-2xl border border-white/20">
        
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 p-4 rounded-full">
            <Mail size={32} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Welcome 👋
        </h1>

        <p className="text-center text-gray-200 mb-8">
          Enter your email to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-4 rounded-2xl outline-none bg-white/20 text-white placeholder-gray-200 border border-white/20"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-white text-purple-700 font-bold hover:scale-[1.02] transition-all duration-200 disabled:opacity-70"
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>
        </form>

        <p className="text-center text-gray-200 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupEmail;
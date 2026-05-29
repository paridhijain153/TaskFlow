import { useState } from "react";
import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import API from "../services/api";

import { ShieldCheck } from "lucide-react";

import toast from "react-hot-toast";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    localStorage.getItem("signupEmail");

  console.log("EMAIL:", email);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error(
        "Email not found. Please signup again."
      );

      navigate("/signup-email");
      return;
    }

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(
        response?.data?.message ||
          "OTP verified successfully"
      );

      navigate("/complete-signup", {
        state: { email },
      });

    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 text-white">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={34} />
          </div>

          <h1 className="text-4xl font-bold mb-2">
            Verify OTP
          </h1>

          <p className="text-white/80">
            Enter the 6-digit OTP sent to
          </p>

          <p className="text-sm text-white/70 mt-1 break-all">
            {email}
          </p>
        </div>

        <form
          onSubmit={handleVerify}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            className="w-full text-center tracking-[10px] text-2xl bg-white/20 border border-white/20 rounded-2xl px-5 py-4 outline-none placeholder:text-white/60 focus:border-white transition"
            maxLength={6}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-indigo-600 font-semibold py-4 rounded-2xl hover:scale-[1.02] transition duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/signup"
              className="text-white/80 underline text-sm"
            >
              Change Email
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
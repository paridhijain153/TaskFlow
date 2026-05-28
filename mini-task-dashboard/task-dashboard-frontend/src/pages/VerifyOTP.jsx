
import { useState } from "react";
import API from "../services/api";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { ShieldCheck } from "lucide-react";

export default function VerifyOTP() {

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const email =
    localStorage.getItem("signupEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      navigate("/complete-signup");

    } catch (err) {

      alert(
        err.response?.data?.message
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
            Enter the 6-digit OTP sent to your email
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
            className="w-full bg-white text-indigo-600 font-semibold py-4 rounded-2xl hover:scale-[1.02] transition duration-300 shadow-lg disabled:opacity-70"
          >

            {
              loading
                ? "Verifying..."
                : "Verify OTP"
            }

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

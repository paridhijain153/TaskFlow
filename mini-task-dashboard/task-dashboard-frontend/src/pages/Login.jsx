
import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import { LockKeyhole } from "lucide-react";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed"
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

            <LockKeyhole size={34} />

          </div>

          <h1 className="text-4xl font-bold mb-2">
            Welcome Back
          </h1>

          <p className="text-white/80">
            Login to continue
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/20 border border-white/20 rounded-2xl px-5 py-4 outline-none placeholder:text-white/60 focus:border-white transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/20 border border-white/20 rounded-2xl px-5 py-4 outline-none placeholder:text-white/60 focus:border-white transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-indigo-600 font-semibold py-4 rounded-2xl hover:scale-[1.02] transition duration-300 shadow-lg disabled:opacity-70"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

          <div className="text-center pt-2">

            <p className="text-white/80 text-sm">
              Don’t have an account?
            </p>

            <Link
              to="/signup"
              className="font-semibold underline"
            >
              Create Account
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}

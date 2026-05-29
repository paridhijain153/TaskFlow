import { useState } from "react";

import API from "../services/api";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { UserPlus } from "lucide-react";

import toast from "react-hot-toast";

export default function CompleteSignup() {

  const [name, setName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const email =
    localStorage.getItem("signupEmail");

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Basic frontend validation
    if (!name || !password) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    if (password.length < 6) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    try {

      setLoading(true);

      // Complete signup
      await API.post(
        "/auth/complete-signup",
        {
          name,
          email,
          password,
        }
      );

      // Auto login
      const res = await API.post(
        "/auth/login",
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

      toast.success(
        "Account created successfully"
      );

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
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

            <UserPlus size={34} />

          </div>

          <h1 className="text-4xl font-bold mb-2">
            Create Account
          </h1>

          <p className="text-white/80">
            Complete your signup
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-white/20 border border-white/20 rounded-2xl px-5 py-4 outline-none placeholder:text-white/60 focus:border-white transition"
            required
          />

          <input
            type="password"
            placeholder="Create Password"
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
            className="w-full bg-white text-indigo-600 font-semibold py-4 rounded-2xl hover:scale-[1.02] transition duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >

            {
              loading
                ? "Creating Account..."
                : "Create Account"
            }

          </button>

          <div className="text-center pt-2">

            <p className="text-white/80 text-sm">
              Already registered?
            </p>

            <Link
              to="/login"
              className="font-semibold underline"
            >
              Login
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}
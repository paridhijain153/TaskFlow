
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-96 space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded-xl"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded-xl"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white w-full py-3 rounded-xl font-medium">
          Login
        </button>

      </form>
    </div>
  );
}

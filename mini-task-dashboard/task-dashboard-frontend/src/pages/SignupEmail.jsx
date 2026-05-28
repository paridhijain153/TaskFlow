import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignupEmail() {
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        {
          email,
        }
      )

      localStorage.setItem("signupEmail", email)

      alert("OTP sent")

      navigate("/verify-otp")
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-96"
      >
        <h1 className="text-3xl font-bold">
          Signup
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 w-full"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Send OTP
        </button>
      </form>
    </div>
  )
}
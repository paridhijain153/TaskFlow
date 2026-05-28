import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function VerifyOTP() {
  const [otp, setOtp] = useState("")

  const navigate = useNavigate()

  const email =
    localStorage.getItem("signupEmail")

  const handleVerify = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      )

      alert("OTP verified")

      navigate("/complete-signup")
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleVerify}
        className="space-y-4 w-96"
      >
        <h1 className="text-3xl font-bold">
          Verify OTP
        </h1>

        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 w-full"
          onChange={(e) =>
            setOtp(e.target.value)
          }
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  )
}
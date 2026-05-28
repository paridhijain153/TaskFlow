import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function CompleteSignup() {
  const [name, setName] = useState("")
  const [password, setPassword] =
    useState("")

  const navigate = useNavigate()

  const email =
    localStorage.getItem("signupEmail")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        "http://localhost:5000/api/auth/complete-signup",
        {
          name,
          email,
          password,
        }
      )

      alert("Signup completed")

      navigate("/login")
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
          Complete Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Account
        </button>
      </form>
    </div>
  )
}
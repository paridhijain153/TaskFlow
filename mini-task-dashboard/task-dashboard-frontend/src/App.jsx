import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import SignupEmail from "./pages/SignupEmail"
import VerifyOTP from "./pages/VerifyOTP"
import CompleteSignup from "./pages/CompleteSignup"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/dashboard"
  element={<Dashboard />}
/>
        <Route
          path="/signup"
          element={<SignupEmail />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/complete-signup"
          element={<CompleteSignup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import SignupEmail from "./pages/SignupEmail";
import VerifyOTP from "./pages/VerifyOTP";
import CompleteSignup from "./pages/CompleteSignup";
import Dashboard from "./pages/Dashboard";

import { Toaster } from "react-hot-toast";

function App() {

  const token =
    localStorage.getItem("token");

  return (
    <BrowserRouter>

      {/* Toast Notifications */}
      <Toaster position="top-right" />

      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup Flow */}
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

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
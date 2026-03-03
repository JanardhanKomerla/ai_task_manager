import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card login-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue to AI Task Manager</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">Login</button>
        </form>

        <p className="auth-switch-text">
          Don&apos;t have an account?{" "}
          <Link className="auth-switch-link" to="/register">
            Sign Up / Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Register and start managing tasks smarter</p>

        <form className="auth-form" onSubmit={handleRegister}>
          <input
            className="auth-input"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button className="auth-btn" type="submit">Register</button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <Link className="auth-switch-link" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

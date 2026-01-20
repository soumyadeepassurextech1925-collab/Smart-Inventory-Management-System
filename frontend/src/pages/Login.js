import React, { useState } from "react";
import "../styling/login.css";
import API from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Inventory Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          Smart Inventory Management System
        </div>
      </div>
    </div>
  );
}

export default Login;

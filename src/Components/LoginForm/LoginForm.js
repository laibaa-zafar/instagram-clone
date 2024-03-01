import React, { useState } from "react";
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      console.log("Login successful. Token:", data.token);

      
      setEmail("");
      setPassword("");
      setError("");

     
      navigate("/sidebar");

    } catch (error) {
      console.error("Login error:", error.message);
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="login-form">
      <div className="writing">
        <img src= "./Images/instagramwriting.png" alt="" />
      </div>
      <div className="logo">
        <img src= "./Images/instalogo.png" alt="" />
      </div>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email or Username: <br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password: <br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup/">Sign up instead.</Link>
      </p>
    </div>
  );
};
export default LoginForm;
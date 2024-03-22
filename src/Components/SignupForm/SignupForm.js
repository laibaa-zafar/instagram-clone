import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import './SignupForm.css'

const SignupForm = () => {
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          confirmPassword,
        }),
      });
      if (response.ok) {
        console.log('Signup successful');
        navigate("/"); 
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    console.error('Passwords do not match');
    return;
  }
  await signup(); // Call signup function to handle form submission
};

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          User name:
          <input
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        <p>
          Go back. <br />
          <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default SignupForm;

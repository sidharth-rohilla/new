import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import sportsGif from "../assets/new.gif";   // 

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const user = allUsers.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (!user) {
      alert("Invalid Email or Password ❌");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("userRole", user.role);
    alert("Login Successful 🎉");

    if (user.role === "player") navigate("/player");
    else if (user.role === "coach") navigate("/coach");
  };

  return (
    <div className="login-page">
      
      {/* Left Side: Animated GIF Background */}
      <div className="login-left">
        <img 
          src={sportsGif} 
          alt="sports animation" 
          className="background-gif" 
        />

        <div className="video-overlay"></div>

        <div className="branding-content">
          <div className="video-badge">Live Scouting AI</div>
          <h1>Join the Elite!</h1>
          <p>
            Experience the future of sports scouting and performance analytics in your city.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          <h2>Log in to your account</h2>
          <p className="subtitle">Enter your details to get started</p>

          <form onSubmit={handleSubmit} className="actual-form">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@gmail.com"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn">Log In</button>
          </form>

          <p className="signup-redirect">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
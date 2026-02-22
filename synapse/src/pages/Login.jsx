import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

    const user = allUsers.find(
      (u) =>
        u.email === loginData.email &&
        u.password === loginData.password
    );

    if (!user) {
      alert("Invalid Email or Password ❌");
      return;
    }

    // Save session
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("userRole", user.role);

    alert("Login Successful 🎉");

    // Role-based navigation
    if (user.role === "player") {
      navigate("/player");
    } else if (user.role === "coach") {
      navigate("/coach");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <p>Welcome Back 👋</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
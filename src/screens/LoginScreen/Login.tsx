import React, { useState } from "react";
import type { FormEvent } from "react";
// import type { AxiosError } from "axios";
// import useApi from "../../hooks/useApi";
// import API_ENDPOINTS from "../../utils/ApiEndPoints";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
// import type { LoginRequest, LoginResponse } from "../../types/api";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // const { callApi, loading } = useApi<LoginResponse, LoginRequest>(
  //   API_ENDPOINTS.LOGIN_ENDPOINT,
  //   "POST"
  // );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
      
    }

    // 
    navigate("/dashboard");
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="profile-pic ">
          <img
            src="/src/assets/fevicon-remove-background.png"
            alt="Profile"
          />
        </div>
        <div className="profile-banner mb-5">
          <img
            src="/src/assets/logo-remove-background.png"
            alt="Profile Banner"
          />
        </div>
      </div>

      <div className="login-right">
        <div className="login-container">
          <div className="login-image">
            <img
              src="/src/assets/logo-remove-background.png"
              alt="FoodZOAI Logo"
              
             
              style={{ width: "300px", height: "250px" }}
            />
          </div>
          <h1 className="login-text">Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
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
            <div className="forget-password">
              <Link to="/forget-password">Forget Password?</Link>
            </div>
            <button type="submit">
              Login
              {/* {loading ? "Logging in..." : "Login"} */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

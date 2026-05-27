import { useState } from "react";
import API from "./api";

function Login({ onLogin, gotoregister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await API.post("login/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);

      localStorage.setItem("username", username);

      onLogin();
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <p>Don't have account?</p>

        <button onClick={gotoregister}>Register</button>
      </div>
    </div>
  );
}

export default Login;

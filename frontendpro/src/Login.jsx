import { useState } from "react";
import API from "./api";

function Login({ onLogin, gotoregister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await API.post("login/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("username", username);
      localStorage.setItem("isLoggedIn", "true");

      onLogin();
    } catch (error) {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Side */}

      <div className="left-panel">
        <h1>SkillForge AI</h1>

        <p>
          Empower your learning journey with AI-powered quizzes,
          assessments, and smart learning experiences.
        </p>

        <ul>
          <li>🚀 AI Generated Quizzes</li>
          <li>📊 Instant Performance Analysis</li>
          <li>🎯 Personalized Learning</li>
          <li>⚡ Fast & Interactive Assessments</li>
        </ul>
      </div>

      {/* Right Side */}

      <div className="right-panel">
        <div className="login-card">

          <h2>Welcome Back 👋</h2>

          <p className="subtitle">
            Sign in to continue your learning journey
          </p>

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

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            className="register-btn"
            onClick={gotoregister}
          >
            Create Account
          </button>

          <p className="bottom-text">
            Don't have an account?
            <span onClick={gotoregister}> Register</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import API from "./api";

function Register({ goToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post(
        "http://127.0.0.1:8000/api/users/register/",
        {
          username,
          email,
          password,
        }
      );

      alert("Registration Successful");
      goToLogin();
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side */}
      <div className="auth-left">
        <h1>SkillForge AI</h1>

        <p>
          Join thousands of learners using AI-powered quizzes,
          assessments, and personalized learning experiences.
        </p>

        <ul className="feature-list">
          <li>🚀 AI Generated Quizzes</li>
          <li>📊 Performance Analytics</li>
          <li>🎯 Personalized Learning</li>
          <li>⚡ Instant Assessments</li>
        </ul>

        <div className="stats-row">
          <div>
            <h3>10K+</h3>
            <p>Students</p>
          </div>

          <div>
            <h3>50K+</h3>
            <p>Quizzes</p>
          </div>

          <div>
            <h3>98%</h3>
            <p>Satisfaction</p>
          </div>
        </div>

        <div className="floating-card card1">
          🤖 AI Powered
        </div>

        <div className="floating-card card2">
          📚 Smart Learning
        </div>

        <div className="floating-card card3">
          🎯 Personalized Quiz
        </div>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="auth-card">
          <h1>Create Account</h1>

          <p>Start your AI learning journey today</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="strength-bar">
            <div
              className="strength-fill"
              style={{
                width:
                  password.length < 4
                    ? "25%"
                    : password.length < 8
                    ? "60%"
                    : "100%",
              }}
            ></div>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={handleRegister}
          >
            Create Account
          </button>

          <p className="bottom-text">
            Already have an account?
            <span onClick={goToLogin}> Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
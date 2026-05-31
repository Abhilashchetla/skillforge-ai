import { useState } from "react";
import API from "./api";

function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [count, setCount] = useState(5);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");

  const generateQuiz = async () => {
    try {
      setLoading(true);

      const response = await API.post("generate-quiz/", {
        
        topic,
        difficulty,
        count,
      });
      console.log("API DATA:", response.data);
      console.log("TOTAL QUESTIONS:", response.data.length);

      setQuiz(response.data);
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowScore(false);
    } catch (error) {
      console.log(error);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer,
    });
  };

const nextQuestion = () => {  
  if (currentQuestion < quiz.length - 1) { 
    setCurrentQuestion(currentQuestion + 1); 
  } else { setShowScore(true); } };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;

    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        score++;
      }
    });

    return score;
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("access");

    window.location.reload();
  };

  return (
    <div className="container">

      {/* Navbar */}
      <div className="navbar">
        <div className="logo">SkillForge AI</div>

        <div className="nav-right">
          <span className="username">
            Welcome, {username}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="hero">
        <h1>🚀 AI Quiz Generator</h1>

        <p>
          Generate personalized quizzes instantly using AI-powered
          learning technology.
        </p>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <h2>10K+</h2>
          <p>Students</p>
        </div>

        <div className="stat-card">
          <h2>50K+</h2>
          <p>Quizzes Generated</p>
        </div>

        <div className="stat-card">
          <h2>98%</h2>
          <p>Success Rate</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="main-panel">

        <div className="generator-panel">

          <h2>Create New Quiz</h2>

          <div className="form">

            <input
              type="text"
              placeholder="Enter Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <input
              type="number"
              value={count}
              min="1"
              max="20"
              onChange={(e) => setCount(e.target.value)}
            />

            <button
              onClick={generateQuiz}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Quiz"}
            </button>

          </div>

        </div>

        {/* AI Card */}
        <div className="ai-card">
          <h2>🤖 AI Assistant</h2>

          <p>
            Create intelligent quizzes from any topic.
          </p>

          <ul>
            <li>⚡ Instant Quiz Generation</li>
            <li>🎯 Adaptive Difficulty</li>
            <li>📚 Unlimited Topics</li>
            <li>📈 Learning Insights</li>
          </ul>
        </div>

      </div>

      {/* Trending Topics */}
      <div className="trending">

        <h2>🔥 Trending Topics</h2>

        <div className="tags">
          <span>Java</span>
          <span>Python</span>
          <span>React</span>
          <span>Django</span>
          <span>SQL</span>
          <span>Machine Learning</span>
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="ai-loading">

          <div className="loader"></div>

          <h2>Generating Your Quiz</h2>

          <p>🤖 Analyzing Topic...</p>
          <p>📝 Creating Questions...</p>
          <p>✅ Preparing Answers...</p>

        </div>
      )}

      {/* Quiz */}
      {quiz.length > 0 && !showScore && !loading && (
        <div className="quiz-box">

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestion + 1) / quiz.length) * 100}%`,
              }}
            ></div>
          </div>

          <h2>
            Question {currentQuestion + 1} / {quiz.length}
          </h2>

          <h3>{quiz[currentQuestion]?.question}</h3>

          {quiz[currentQuestion]?.options?.map((option, index) => (
            <div
              className="option-box"
              key={index}
            >
              <label>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={
                    selectedAnswers[currentQuestion] === option
                  }
                  onChange={() => handleAnswer(option)}
                />

                {option}
              </label>
            </div>
          ))}

          <div className="buttons">

            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

<button 
type="button" 
onClick={() => nextQuestion()} 
> 
{currentQuestion === quiz.length - 1 
? "Finish Quiz" 
: "Next"} 

</button>
          </div>

        </div>
      )}

      {/* Score */}
      {showScore && (
        <div className="score-box">

          <h1>🎉 Quiz Completed!</h1>

          <div className="score-circle">
            {Math.round(
              (calculateScore() / quiz.length) * 100
            )}%
          </div>

          <h2>
            Score: {calculateScore()} / {quiz.length}
          </h2>

          <button
            onClick={() => {
              setShowScore(false);
              setCurrentQuestion(0);
              setSelectedAnswers({});
            }}
          >
            Restart Quiz
          </button>

        </div>
      )}

    </div>
  );
}

export default QuizGenerator;
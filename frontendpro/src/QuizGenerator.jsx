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

  const username = localStorage.getItem("username");

  const generateQuiz = async () => {
    try {
      const response = await API.post("generate-quiz/", {
        topic,
        difficulty,
        count,
      });

      setQuiz(response.data);

      setCurrentQuestion(0);

      setSelectedAnswers({});

      setShowScore(false);
    } catch (error) {
      console.log(error);
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
    } else {
      setShowScore(true);
    }
  };

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
    localStorage.clear();

    window.location.reload();
  };

  return (
    <div className="container">
      {/* Navbar */}

      <div className="navbar">
        <div className="logo">SkillForge AI</div>

        <div className="nav-right">
          <span className="username">Welcome, {username}</span>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {/* Title */}

      <h1 className="title">AI Quiz Generator</h1>

      {/* Form */}

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
          <option value="">Select level</option>

          <option value="easy">Easy</option>

          <option value="medium">Medium</option>

          <option value="hard">Hard</option>
        </select>

        <input
          type="number"
          placeholder="Number of Questions"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <button onClick={generateQuiz}>Generate Quiz</button>
      </div>

      {/* Quiz Section */}

      {quiz.length > 0 && !showScore && (
        <div className="quiz-box">
          <h2>
            Question {currentQuestion + 1} / {quiz.length}
          </h2>

          <h3>{quiz[currentQuestion].question}</h3>

          {quiz[currentQuestion].options.map((option, index) => (
            <div className="option-box" key={index}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedAnswers[currentQuestion] === option}
                  onChange={() => handleAnswer(option)}
                />

                {option}
              </label>
            </div>
          ))}

          {/* Buttons */}

          <div className="buttons">
            <button onClick={prevQuestion} disabled={currentQuestion === 0}>
              Previous
            </button>

            <button onClick={nextQuestion}>
              {currentQuestion === quiz.length - 1 ? "Finish Quiz" : "Next"}
            </button>
          </div>
        </div>
      )}

      {/* Score Section */}

      {showScore && (
        <div className="score-box">
          <h1>Quiz Completed 🎉</h1>

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

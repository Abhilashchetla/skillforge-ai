import Login from "./Login";
import Register from "./Register";
import QuizGenerator from "./QuizGenerator";
import "./Styles/Login.css";
import "./Styles/Register.css";
import "./Styles/Quiz.css";
import "./Styles/Global.css";

import { useState } from "react";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "register" && (
        <Register goToLogin={() => setPage("login")} />
      )}

      {page === "login" && (
        <Login onLogin={() => setPage("quiz")}  gotoregister={() => setPage("register")}/>
      )}

      {page === "quiz" && (
        <QuizGenerator />
      )}
    </div>
  );
}

export default App;
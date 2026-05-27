import Login from "./Login";
import Register from "./Register";
import QuizGenerator from "./QuizGenerator";
import './App.css';
import { useState } from "react";
function App() {
  const[page,setpage]=useState("login")
  return (
    <div>
      {page==="register" && (<Register goToLogin={()=>setpage("login")}/>)}
      {page==="login" && (<Login onLogin={()=>setpage("quiz")} gotoregister={()=>setpage("register")}/>)}
      {page==="quiz" && (<QuizGenerator />)}
    </div>
  );
}

export default App;
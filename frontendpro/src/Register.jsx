import { useState } from "react";
import API from "./api";

function Register({goToLogin}){
    const[username, setUsername]=useState("")
    const[email,setemail]=useState("")
    const[password,setPassword]=useState("")

    const handleregister=async()=>{
        try{
            await API.post(
                 "http://127.0.0.1:8000/api/users/register/",
                {
                    username,
                    email,
                    password
                }
            )
            alert("Registration Successful")
            goToLogin()
        }catch(error){
            alert("Registration Failed")
        }
    }
    return(
        <div className="auth-container">
            <div className="auth-box">
                <h1>Create Account</h1>
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={handleregister}>Register</button>
                <p>Already have an Account</p>
                <button onClick={goToLogin}>Login</button>

            </div>

        </div>
    )
}
export default Register;
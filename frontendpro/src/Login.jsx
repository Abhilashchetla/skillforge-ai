import { useState } from "react";
import API from "./api";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {

        try {

            const response = await API.post(
                "token/",
                {
                    username,
                    password
                }
            )

            localStorage.setItem(
                "access",
                response.data.access
            )

            localStorage.setItem(
                "username",
                username
            )

            alert("Login Successful")

        } catch (error) {

            alert("Invalid Credentials")

        }

    }

    return (

        <div className="login-box">

            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>

    )
}

export default Login;
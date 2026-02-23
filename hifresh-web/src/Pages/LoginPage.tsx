import { useState,  } from 'react';
import type { FormEvent }from 'react';
import './pages.css';
import { Textbox } from "../components/Textbox.tsx";
import { Button } from "../components/button.tsx";
import { UserService } from "../API/LoginService.ts";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";


export function LoginPage() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        try {
           const loggedInUser = await UserService.login(username, password);
           login(loggedInUser);
            navigate("/");
        } catch (err) {
            setError("Fel användarnamn eller lösenord");
        }
    };

    return (

        <div className={"loginPageRoot"}>
            <h1>Logga in för att använda sidan</h1>

            <form onSubmit={handleLogin} className={"loginCredentials"}>

                <h2>Username: </h2>
                <Textbox
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    inputText="Username"
                    className="loginInput"
                />

                <h2>Password: </h2>
                <Textbox
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    inputText="Password"
                    className="passWordInput"
                />

                {error && <p style={{color: 'red'}}>{error}</p>}

                <Button text={"Login"} type="submit" className="loginButton"></Button>
            </form>
        </div>
    );
}
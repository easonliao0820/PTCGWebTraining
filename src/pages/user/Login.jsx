import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '@img/turtwig.png';
import styles from "@/styles/pages/user/login.module.scss";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Login successful!");
                navigate("/");
            } else {
                alert(result.message || "Login failed!");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Server error, try again later.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <img src={image} width={200} />
            <div className={styles.loginBox}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Username</label>
                    <input
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <div className={styles.loginLink}>
                    <p>
                        You don't have an account? <Link to={"/register"}>Register</Link>
                    </p>
                    <p>
                        <Link to={"/"}>Back to HomePage</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

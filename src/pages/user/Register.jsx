import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "@/styles/pages/user/register.module.scss";
import bannerImage from '@img/turtwig.png';

export default function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email }),
            });

            const result = await response.json();
            
            if (response.ok) {
                alert("Register successful!");
                window.location.href = "/login"; // 導回登入
            } else {
                alert(result.message || "Register failed!");
            }

        } catch (err) {
            console.error("Register error:", err);
            alert("Server error, try again later.");
        }
    };

    return (
        <div className={styles.registerContainer}>
            <img src={bannerImage} width={200} />
            <div className={styles.registerBox}>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Register</button>
                </form>

                <div className={styles.loginLink}>
                    <p>Already have an account? <a href="/login">Login</a></p>
                    <p><Link to={"/"}>Back to HomePage</Link></p>
                </div>
            </div>
        </div>
    );
}

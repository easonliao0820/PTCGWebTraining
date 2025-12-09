import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bannerImage from '@img/turtwig.png';
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

      const data = await response.json();

      if (response.ok) {
        // 存 token
        localStorage.setItem("token", data.token);

        // 解析 token 拿 username 和 user_id
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        const loggedUser = payload.username;
        const userId = payload.user_id; // 後端 JWT 必須有 user_id
        localStorage.setItem("username", loggedUser);
        localStorage.setItem("user_id", userId);

        console.log("登入使用者:", loggedUser, "ID:", userId);
        navigate("/");
      } else {
        alert(data.error || "登入失敗！");
      }
    } catch (err) {
      console.error(err);
      alert("伺服器錯誤，請稍後再試");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img src={bannerImage} width={200} />
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
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

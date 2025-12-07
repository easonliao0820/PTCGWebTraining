import React, { useState, useEffect } from "react"; 
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';

import styles from '@/styles/components/layout/navbar.module.scss';
import NavbarImage from '@img/pikachu.png';

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = jwtDecode(token);
        setUsername(user.username);
        console.log("Navbar 使用者:", user.username);
      } catch (err) {
        console.error("Token 解析失敗", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link to={'/'} className={styles.logo}>
        <img src={NavbarImage} alt={'pika'} width={50}/>
        &nbsp; Easy Simple and Nice to Train PTCG
      </Link>
      <ul className={styles.menu}>
        <li><Link className={styles.link} to={'/'}>首頁</Link></li>
        <li><Link className={styles.link} to={'/list'}>清單</Link></li>
        <li><Link className={styles.link} to={'/about'}>關於</Link></li>

        {username ? (
          <>
            <li className={styles.link}>Hi, {username}</li>
            <li>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                登出
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to={'/login'} className={styles.link}>登入</Link></li>
            <li><Link to={'/register'} className={styles.link}>註冊</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

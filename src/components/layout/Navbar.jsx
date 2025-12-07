import React from "react";
import { Link } from 'react-router-dom';

import styles from '@/styles/components/layout/navbar.module.scss';
import NavbarImage from '@img/pikachu.png';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      
      <Link to={'/'} className={styles.logo}>
        <img src={NavbarImage} alt={'pika'} width={50}/>
        	&nbsp; Easy Simple and Nice to Train PTCG
      </Link>
      <ul className={styles.menu}>
        <li><Link className={styles.link}>首頁</Link></li>
        <li><Link className={styles.link}>清單</Link></li>
        <li><Link className={styles.link}>關於</Link></li>
        <li><Link to={'/login'} className={styles.link}>登入</Link></li>
        <li><Link to={'/register'} className={styles.link}>註冊</Link></li>
      </ul>
    </nav>
  );
}
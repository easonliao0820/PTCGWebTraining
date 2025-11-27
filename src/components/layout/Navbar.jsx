import React from "react";
import { Link } from 'react-router-dom';

import styles from '@/styles/components/layout/navbar.module.scss';
import NavbarImage from '@/assets/images/pikachu.png';

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
      </ul>
    </nav>
  );
}
import { Link } from 'react-router-dom';
import styles from '@/styles/pages/homepage.module.scss';
import Navbar from "@/components/layout/Navbar";
import Footer from '@/components/layout/Footer';

import bannerImage from '@/assets/images/turtwig.png';
import masterball from '@/assets/images/masterball.png';
import pokeball from '@/assets/images/pokeball.png';
import premierball from '@/assets/images/premierball.png';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <img src={bannerImage} alt={'turtwig'} width={400} />
        <h1 className={styles.title}>歡迎來到 PTCG 練習站</h1>
        <p className={styles.subtitle}>!!你和朋友是為了贏得PTCG比賽而來徹夜練習的吧!!!</p>
        <div className={styles.functionArea}>
          <Link to="/deck-builder" className={`${styles.linkbutton} ${styles.masterball}`}>
            <img src={masterball} alt={'masterball'} width={50} />
            創建房間
          </Link>
          <Link to="/deck-manager" className={`${styles.linkbutton} ${styles.premierball}`}>
            <img src={premierball} alt={'premierball'} width={50} />
            牌組管理
          </Link>
          <Link to="/deck-builder" className={`${styles.linkbutton} ${styles.pokeball}`}>
            <img src={pokeball} alt={'pokeball'} width={50}/>
            使用教學
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  )
}

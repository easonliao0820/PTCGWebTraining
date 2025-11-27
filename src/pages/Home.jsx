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
        <p className={styles.subtitle}>!!!方便你尋找你心中最佳的夥伴!!!</p>
        <div className={styles.functionArea}>
          <Link to="/card-search/collection" className={`${styles.linkbutton} ${styles.masterball}`}>
            <img src={masterball} alt={'masterball'} width={50} />
            卡牌一覽
          </Link>
          <Link to="/card-search" className={`${styles.linkbutton} ${styles.pokeball}`}>
            <img src={pokeball} alt={'pokeball'} width={50} />
            卡牌搜尋
          </Link>
          <Link to="/deck-manager" className={`${styles.linkbutton} ${styles.premierball}`}>
            <img src={premierball} alt={'premierball'} width={50} />
            清單管理
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import styles from '@/styles/pages/deck/deckManager.module.scss';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DeckManager() {
  const decks = [
    { id: 1, name: '草系牌組', updatedAt: '2025-07-30' },
    { id: 2, name: '火系爆擊流', updatedAt: '2025-07-28' },
    { id: 3, name: '水系控場', updatedAt: '2025-07-25' },
    { id: 4, name: '雷系速攻', updatedAt: '2025-07-23' },
    { id: 5, name: '超能干擾', updatedAt: '2025-07-20' },
    { id: 6, name: '惡系陷阱', updatedAt: '2025-07-19' },
    { id: 7, name: '鋼鐵防禦', updatedAt: '2025-07-18' },
    { id: 8, name: '雷系速攻', updatedAt: '2025-07-23' },
    { id: 9, name: '超能干擾', updatedAt: '2025-07-20' },
    { id: 10, name: '惡系陷阱', updatedAt: '2025-07-19' },
    { id: 11, name: '鋼鐵防禦', updatedAt: '2025-07-18' },
  ];

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(decks.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDecks = decks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <section className={styles.titleArea}>
          <h1>Your Deck Area</h1>
          <Link className={styles.newDeckButton} to="/deck-builder">＋ 新增牌組</Link>
        </section>

        <ul className={styles.deckList}>
          {currentDecks.map((deck) => (
            <li key={deck.id} className={styles.deckItem}>
              <article>
                <h2>{deck.name}</h2>
                <p>更新時間：{deck.updatedAt}</p>
              </article>
              <article className={styles.deckActions}>
                <Link to={`/deck-builder?id=${deck.id}`}>編輯</Link>
                <FaRegTrashAlt className={styles.trash} />
              </article>
            </li>
          ))}
        </ul>

        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            上一頁
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ''}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            下一頁
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

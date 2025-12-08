import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import styles from '@/styles/pages/deck/deckManager.module.scss';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DeckManager() {

  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");

  // 🔹 抓使用者牌組
  async function fetchDecks() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/decks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDecks(res.data);
    } catch (err) {
      console.error("取得卡組失敗", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 刪除 API
  async function deleteDeck(id) {
    if (!window.confirm("確定要刪除嗎？")) return;

    try {
      await axios.delete(`http://localhost:3000/decks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDecks(); // ⬅ 刪除後重新載入
    } catch (err) {
      console.error("刪除失敗", err);
    }
  }

  useEffect(() => {
    fetchDecks();
  }, []);

  if (loading) return <p>載入中...</p>;

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
            <li key={deck.deck_id} className={styles.deckItem}>
              <article>
                <h2>{deck.deck_name}</h2>
                <p>更新時間：{deck.updated_at}</p>
              </article>

              <article className={styles.deckActions}>
                <Link to={`/deck-builder?id=${deck.deck_id}`}>編輯</Link>

                {/* 🔹 綁刪除事件 */}
                <FaRegTrashAlt
                  className={styles.trash}
                  onClick={() => deleteDeck(deck.deck_id)}
                />
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

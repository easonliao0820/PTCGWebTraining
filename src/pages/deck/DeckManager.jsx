import { useState, useEffect } from 'react';  
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import styles from '@/styles/pages/deck/deckManager.module.scss';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DeckManager() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("token");

  // 🔹 取得使用者卡組 (MongoDB + MySQL)
  async function fetchDecks() {
    try {
      setLoading(true);
      if (!token) throw new Error("未登入");

      const user = jwtDecode(token);
      const author_id = user.user_id;

      // MongoDB
      const mongoRes = await axios.get("http://localhost:3001/mongo/decks", {
        headers: { Authorization: `Bearer ${token}` },
        params: { author_id }
      });

      // MySQL
      const mysqlRes = await axios.get("http://localhost:3000/decks", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 將 MySQL + MongoDB 合併，可依需求合併或只顯示 MongoDB
      const combined = mongoRes.data.map(m => {
        const mysqlDeck = mysqlRes.data.find(d => d.deck_id === m.deck_id);
        return {
          ...m,
          created_at: mysqlDeck?.created_at || m.created_at
        };
      });

      setDecks(combined);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("請重新登入");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.error("取得卡組失敗", err);
      }
    } finally {
      setLoading(false);
    }
  }

  // 🔹 刪除卡組 (MongoDB + MySQL)
  async function deleteDeck(deck_id) {
    if (!window.confirm("確定要刪除嗎？")) return;
    if (!token) return;

    try {
      const user = jwtDecode(token);
      const author_id = user.user_id;

      // MySQL
      await axios.delete(`http://localhost:3000/decks/${deck_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // MongoDB
      await axios.delete("http://localhost:3001/mongo/decks", {
        headers: { Authorization: `Bearer ${token}` },
        data: { author_id, deck_id }
      });

      // 更新前端畫面
      setDecks(prev => {
        const updated = prev.filter(d => d.deck_id !== deck_id);
        const totalPages = Math.ceil(updated.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) setCurrentPage(totalPages > 0 ? totalPages : 1);
        return updated;
      });

    } catch (err) {
      if (err.response?.status === 404) alert("找不到此卡組或無刪除權限");
      else if (err.response?.status === 401) {
        alert("請重新登入");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else console.error("刪除失敗", err);
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
          {currentDecks.map(deck => (
            <li key={deck.deck_id} className={styles.deckItem}>
              <article>
                <h2>{deck.deck_name}</h2>
                <p>更新時間：{deck.created_at}</p>
              </article>
              <article className={styles.deckActions}>
                <Link className={styles.listbtn} to={`/deck-builder/${deck.deck_id}`}>產生清單</Link>
                <Link to={`/deck-builder/${deck.deck_id}`}>編輯</Link>
                <FaRegTrashAlt
                  className={styles.trash}
                  onClick={() => deleteDeck(deck.deck_id)}
                />
              </article>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              下一頁
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

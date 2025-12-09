import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styles from "@/styles/pages/cardsearch/cardinfo.module.scss";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CardDetail() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState([]);
  const token = localStorage.getItem("token");

  // 🔹 取得卡牌資料
  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/cards/${cardId}`);
        setCard(res.data);
      } catch (err) {
        console.error(err);
        setCard(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [cardId]);

  // 🔹 取得使用者 Deck 列表
  useEffect(() => {
    const fetchDecks = async () => {
      if (!token) return;
      try {
        const user = jwtDecode(token);
        const user_id = user.user_id;

        const res = await axios.get("http://localhost:3000/decks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // 過濾出自己的 Deck
        const userDecks = res.data.filter(d => d.user_id === user_id);
        setDecks(userDecks);
      } catch (err) {
        console.error("抓取 Deck 失敗", err);
      }
    };
    fetchDecks();
  }, [token]);

  // 🔹 將卡片加入 Deck（前端暫存，或可呼叫 API 儲存）
  const addToDeck = async (deck_id) => {
    if (!token) {
      alert("請先登入");
      return;
    }
    try {
      // 可以選擇直接呼叫後端 API 儲存到 Deck
      // 例如 axios.post(`/mongo/decks/addCard`, { deck_id, card_id: card.card_id })
      alert(`卡牌 ${card.name} 已加入 Deck ${deck_id}（前端暫存）`);
    } catch (err) {
      console.error("加入 Deck 失敗", err);
      alert("加入 Deck 失敗");
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>讀取中...</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← 返回
        </button>
        <p>卡牌不存在</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← 返回
        </button>

        <div className={styles.content}>
          <div className={styles.imageArea}>
            <img className={styles.image} src={card.image_url} alt={card.name} />
          </div>

          <div className={styles.info}>
            <article className={styles.details}>
              <h1 className={styles.name}>
                {card.name}
                {card.special_card_type && (
                  <span className={styles.special}>{card.special_card_type}</span>
                )}
              </h1>

              <h2 className={styles.collection}>系列：{card.name_ch}</h2>
              <table className={styles.meta}>
                <tbody>
                  <tr>
                    <td>階段：{card.stage}</td>
                  </tr>
                  <tr>
                    <td>HP：{card.hp}</td>
                    <td>屬性：{card.energy_type_ch}</td>
                  </tr>
                  <tr>
                    <td>稀有度：{card.rarity_en}</td>
                    <td>卡號：{card.card_id}</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <div className={styles.infopokemon}>
              <h3>寶可夢介紹</h3>
              <p>{card.info}</p>
            </div>
          </div>

          <div className={styles.list}>
            <ul className={styles.deckList}>
              {decks.map(deck => (
                <li key={deck.deck_id} className={styles.deckItem}>
                  <article>
                    <h2>{deck.deck_name}</h2>
                    <p>更新時間：{deck.created_at}</p>
                  </article>
                  <article className={styles.deckActions}>
                    <IoMdAdd
                      className={styles.additem}
                      onClick={() => addToDeck(deck.deck_id)}
                    />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

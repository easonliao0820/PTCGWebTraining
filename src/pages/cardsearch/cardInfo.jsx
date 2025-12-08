import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import styles from "@/styles/pages/cardsearch/cardinfo.module.scss";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CardDetail() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  // deck sample data
  const decks = [
    { id: 1, name: "草系牌組", updatedAt: "2025-07-30" },
    { id: 2, name: "火系爆擊流", updatedAt: "2025-07-28" },
    { id: 3, name: "水系控場", updatedAt: "2025-07-25" },
    // ...其他 deck
  ];

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/cards/${cardId}`);
        if (!res.ok) throw new Error("找不到卡牌");
        const data = await res.json();
        setCard(data);
      } catch (err) {
        console.error(err);
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId]);

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
                    <td>
                      <p>階段：{card.stage}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>HP：{card.hp}</p>
                    </td>
                    <td>
                      <p>屬性：{card.energy_type_ch}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>稀有度：{card.rarity_en}</p>
                    </td>
                    <td>
                      <p>卡號：{card.card_id}</p>
                    </td>
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
              {decks.map((deck) => (
                <li key={deck.id} className={styles.deckItem}>
                  <article>
                    <h2>{deck.name}</h2>
                    <p>更新時間：{deck.updatedAt}</p>
                  </article>
                  <article className={styles.deckActions}>
                    <IoMdAdd className={styles.additem} />
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

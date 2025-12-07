import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cardData } from "@/data/cards";
import { IoMdAdd } from "react-icons/io";
import styles from "@/styles/pages/cardsearch/cardinfo.module.scss";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CardDetail() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);

  // deck sample data
  const decks = [
    { id: 1, name: "草系牌組", updatedAt: "2025-07-30" },
    { id: 2, name: "火系爆擊流", updatedAt: "2025-07-28" },
    { id: 3, name: "水系控場", updatedAt: "2025-07-25" },
    { id: 4, name: "雷系速攻", updatedAt: "2025-07-23" },
    { id: 5, name: "超能干擾", updatedAt: "2025-07-20" },
    { id: 6, name: "惡系陷阱", updatedAt: "2025-07-19" },
    { id: 7, name: "鋼鐵防禦", updatedAt: "2025-07-18" },
    { id: 8, name: "雷系速攻", updatedAt: "2025-07-23" },
    { id: 9, name: "超能干擾", updatedAt: "2025-07-20" },
    { id: 10, name: "惡系陷阱", updatedAt: "2025-07-19" },
    { id: 11, name: "鋼鐵防禦", updatedAt: "2025-07-18" },
  ];

  const currentDecks = decks;

  useEffect(() => {
    const foundCard = cardData.find((c) => String(c.id) === String(cardId));
    setCard(foundCard || null);
  }, [cardId]);

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
            <img className={styles.image} src={card.image} alt={card.name} />
          </div>

          <div className={styles.info}>
            <h1 className={styles.name}>
              {card.name}
              {card.special_card_type && (
                <span className={styles.special}>
                  {card.special_card_type}
                </span>
              )}
            </h1>

            <h2 className={styles.collection}>系列：{card.collectionName}</h2>

            <article className={styles.details}>
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
                      <p>屬性：{card.energy_type}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>稀有度：{card.rarity}</p>
                    </td>
                    <td>
                      <p>卡號：{card.number_in_collections}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className={styles.block}>
                <h3>弱點 / 抗性 / 退場費用</h3>
                <p>弱點：{card.weakness || "無"}</p>
                <p>抗性：{card.resistance || "無"}</p>
                <p>退場費用：{card.retreat_cost}</p>
              </div>
            </article>

            <div className={styles.infopokemon}>
              <h3>寶可夢介紹</h3>
              <p>{card.info}</p>
            </div>
          </div>

          <div className={styles.list}>
            <ul className={styles.deckList}>
              {currentDecks.map((deck) => (
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

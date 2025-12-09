import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from '@/styles/pages/deck/list.module.scss';

export default function DeckViewer() {
  const { deckId } = useParams(); // URL 取得 deckId
  const [deckName, setDeckName] = useState("");
  const [deck, setDeck] = useState([]);

  // 🔹 抓 Deck 資料
  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;

      try {
        const res = await axios.get("http://localhost:3001/mongo/decks", {
          params: { deck_id: deckId }
        });

        const deckData = res.data[0];
        if (!deckData) return;

        setDeckName(deckData.deck_name || "");
        setDeck(deckData.cards || []);
      } catch (err) {
        console.error("抓取 Deck 失敗:", err);
      }
    }

    fetchDeck();
  }, [deckId]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Deck Viewer: {deckName}</h1>

        <section className={styles.layout}>
          <article className={styles.desk}>
            <h2>Deck Cards </h2>
            <ul className={styles.deckList}>
              {deck.map((card, idx) => (
                <li key={idx} className={styles.cardItem}>
                  <p>{idx}</p>
                  <p>{card.name}</p> 
                  <p>{card.stage && `  Stage: ${card.stage}`}</p>
                  <p>{card.hp && `  HP: ${card.hp}`} </p>
                  <p>{card.energy_ch && `  屬性: ${card.energy_ch}`}</p>
                  <p>{card.speca_type_ch && `  稀有度: ${card.speca_type_ch}`}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import AddCardItem from '@/components/common/AddCardItem';
import RemoveCardItem from '@/components/common/RemoveCardItem';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from '@/styles/pages/deck/addDeck.module.scss';

export default function AddDeckBuild() {
  const navigate = useNavigate();
  const { deckId } = useParams(); // 從 URL 取得 deckId
  const [search, setSearch] = useState('');
  const [deckName, setDeckName] = useState('');
  const [deck, setDeck] = useState([]);

  const [attributes, setAttributes] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [attribute, setAttribute] = useState({ energy_id: 0, energy_ch: '所有屬性' });
  const [rarity, setRarity] = useState({ rarity_id: 0, rarity_en: '所有稀有度' });
  const [allCards, setAllCards] = useState([]);

  // 🔹 初始抓下拉資料和所有卡牌
  useEffect(() => {
    async function fetchReference() {
      try {
        const res = await axios.get('http://localhost:3000/refs');
        const { energy, rarity } = res.data;
        setAttributes([{ energy_id: 0, energy_ch: '所有屬性' }, ...energy]);
        setRarities([{ rarity_id: 0, rarity_en: '所有稀有度' }, ...rarity]);

        const cardsRes = await axios.get('http://localhost:3000/cards');
        setAllCards(cardsRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReference();
  }, []);

  // 🔹 如果 deckId 存在，抓取舊 Deck (MongoDB)
  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      try {
        const res = await axios.get('http://localhost:3001/mongo/decks', {
          params: { deck_id: deckId }
        });
        const deckData = res.data[0];
        if (!deckData) return;
        setDeckName(deckData.deck_name || "");
        setDeck(deckData.cards || []);
      } catch (err) {
        console.error("抓取舊 Deck 失敗:", err);
      }
    }
    fetchDeck();
  }, [deckId]);

  // 🔹 搜尋卡牌
  const handleSearch = async () => {
    try {
      const params = {};
      if (attribute.energy_id !== 0) params.energy = attribute.energy_id;
      if (rarity.rarity_id !== 0) params.rarity = rarity.rarity_id;
      if (search) params.q = search;

      const res = await axios.get('http://localhost:3000/cards', { params });
      setAllCards(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 儲存或更新 Deck (MySQL + MongoDB)
  const handleSaveDeck = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("請先登入"); return; }
    const user = jwtDecode(token);
    const user_id = user.user_id;

    if (!deckName) { alert("請輸入 Deck 名稱"); return; }

    try {
      if (deckId) {
        // ✅ 更新舊 Deck
        // 1. 更新 MySQL 名稱
        await axios.put(
          `http://localhost:3000/decks/${deckId}`,
          { deck_name: deckName },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // 2. 更新 MongoDB 名稱與卡牌
        await axios.put(
          'http://localhost:3001/mongo/decks',
          {
            author_id: user_id,
            deck_id: Number(deckId),
            deck_name: deckName,
            cards: deck.map(c => ({ ...c, card_id: String(c.card_id) }))
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Deck 更新成功！");
      } else {
        // ✅ 新增 Deck
        const res = await axios.post(
          "http://localhost:3000/decks",
          { deck_name: deckName, user_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { deck_id } = res.data;
        if (!deck_id) throw new Error("無法取得 MySQL Deck ID");

        // 建立 MongoDB Deck
        await axios.post(
          "http://localhost:3001/mongo/decks",
          {
            deck_id,
            author_id: user_id,
            author_name: user.username || "匿名",
            deck_name: deckName,
            cards: deck.map(c => ({ ...c, card_id: String(c.card_id) }))
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Deck 建立成功！");
        navigate(`/deck-manager`);
      }
    } catch (err) {
      console.error(err);
      alert("Deck 儲存失敗");
    }
  };

  // 🔹 加入/移除卡牌
  const addToDeck = (card) => {
    if (deck.length >= 60) return;
    setDeck([...deck, card]);
  };

  const removeFromDeck = (index) => {
    const updatedDeck = [...deck];
    updatedDeck.splice(index, 1);
    setDeck(updatedDeck);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Deck Builder</h1>

        {/* Deck 名稱 */}
        <div className={styles.AddDeck}>
          <h4>清單名稱 :</h4>
          <input
            type="text"
            placeholder="Deck Name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className={styles.search}
          />
          <button className={styles.save} onClick={handleSaveDeck}>完成儲存</button>
          <Link className={styles.cancel} to={"/deck-manager"}>退回列表</Link>
        </div>

        {/* 搜尋區 */}
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          <select
            value={attribute.energy_id}
            onChange={e => setAttribute(attributes.find(a => a.energy_id === Number(e.target.value)))}
            className={styles.search}
          >
            {attributes.map(attr => (
              <option key={attr.energy_id} value={attr.energy_id}>{attr.energy_ch}</option>
            ))}
          </select>
          <select
            value={rarity.rarity_id}
            onChange={e => setRarity(rarities.find(r => r.rarity_id === Number(e.target.value)))}
            className={styles.search}
          >
            {rarities.map(r => (
              <option key={r.rarity_id} value={r.rarity_id}>{r.rarity_en}</option>
            ))}
          </select>
          <button className={styles.searchButton} onClick={handleSearch}>搜尋</button>
        </div>

        {/* 卡牌列表 & Deck */}
        <section className={styles.layout}>
          <article className={styles.card}>
            <h2>All Cards</h2>
            <div className={styles.cardList}>
              {allCards.map((card, idx) => (
                <AddCardItem key={idx} card={card} onAdd={() => addToDeck(card)} />
              ))}
            </div>
          </article>

          <article className={styles.desk}>
            <h2>My Deck ({deck.length}/60)</h2>
            <div className={styles.deckList}>
              {deck.map((card, idx) => (
                <RemoveCardItem key={idx} card={card} onRemove={() => removeFromDeck(idx)} />
              ))}
            </div>
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}

import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { collectionData } from '@/data/collection';
import { attributesData } from '@/data/attributes';
import { rarityData } from '@/data/rarity';
import styles from '@/styles/pages/cardsearch/cardsSearch.module.scss';

export default function CardSearch() {
  const [search, setSearch] = useState("");
  const [attributes, setAttributes] = useState("");
  const [year, setYear] = useState("");
  const [rarity, setRarity] = useState("");

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Collection Card Filer</h1>

        <div className={styles.controls}>
          <input
            className={styles.search}
            type="text"
            placeholder="搜尋卡牌名稱..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className={styles.search}
            value={attributes}
            onChange={(e) => setAttributes(e.target.value)}
          >
            {attributesData.map((attr) => (
              <option key={attr.key} value={attr.key}>
                {attr.label}
              </option>
            ))}
          </select>
          <select
            className={styles.search}
            value={rarity}
            onChange={(e) => setRarity(e.target.value)} F
          >
            {rarityData.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>

          <input
            className={styles.searchYear}
            type="number"
            min="1900"
            max="2100"
            placeholder="Years（例如 2024）"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button className={styles.searchButton}>搜尋</button>
        </div>

        <div className={styles.collectionGrid}>
          {collectionData.map((card, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <p className={styles.cardTitle}>{card.name}</p>
                <p className={styles.cardType}>{card.series}</p>
              </div>
              {card.imgPath ? (
                <img src={`${card.imgPath}`} alt={card.name} />
              ) : (
                <div className={styles.cardName}>{card.name}</div>
              )}

              <div className={styles.cardFooter}>
                <p className={styles.cardTitle}>{card.name}</p>
                <p className={styles.cardType}>{card.series}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
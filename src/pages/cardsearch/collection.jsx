import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { collectionData } from '@/data/collection';
import styles from '@/styles/pages/cardsearch/collectionSearch.module.scss';

export default function CardSearch() {
  const [search, setSearch] = useState("");
  const [sales, setSales] = useState("");
  const [year, setYear] = useState("");

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Collection Search</h1>

        <div className={styles.controls}>
          <input
            className={styles.search}
            type="text"
            placeholder="搜尋卡牌彈數名稱..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={styles.search}
            value={sales}
            onChange={(e) => setSales(e.target.value)}
          >
            <option value="">全部類型</option>
            <option value="擴充包">擴充包</option>
            <option value="強化擴充包">強化擴充包</option>
            <option value="高級擴充包">高級擴充包</option>
            <option value="特典卡">特典卡</option>
            <option value="挑戰牌組">挑戰牌組</option>
          </select>
          <input
            className={styles.searchYear}
            type="number"
            min="1900"
            max="2100"
            placeholder="年份（例如 2024）"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button className={styles.searchButton}>搜尋</button>
        </div>

        <div className={styles.grid}>
          {collectionData.map((card, idx) => (
            <Link
              key={idx}
              to={`/card-search/collection/${card.collectionId}`}
              className={styles.collection}
            >
              {card.imgPath ? (
                <img src={card.imgPath} alt={card.name} />
              ) : (
                <div className={styles.cardName}>{card.name}</div>
              )}

              <div className={styles.cardFooter}>
                <p className={styles.cardTitle}>{card.name}</p>
                <p className={styles.cardType}>{card.series}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from '@/styles/pages/cardsearch/collectionSearch.module.scss';

export default function Collection() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [collectionType, setCollectionType] = useState(4); // 預設全部
  const [collectionsTypes, setCollectionsTypes] = useState([]); // 下拉選單資料
  const [collections, setCollections] = useState([]); // 搜尋結果

  // 🔹 抓 collection type 下拉選單
  const fetchCollectionsTypes = async () => {
    try {
      const response = await fetch("http://localhost:3000/refs/collection");
      const data = await response.json();
      // 後端回傳格式：{ collectionsType: [...] }
      if (data.collectionsType) {
        setCollectionsTypes(data.collectionsType);
      }
    } catch (err) {
      console.error("抓取 collection type 失敗:", err);
    }
  };

  // 🔹 抓搜尋結果
  const fetchCollections = async () => {
    try {
      const response = await fetch("http://localhost:3000/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: year || undefined,
          keyword: search || undefined,
          collection_type: collectionType || undefined,
        }),
      });

      const data = await response.json();
      setCollections(data);
    } catch (err) {
      console.error("抓搜尋結果失敗:", err);
    }
  };

  // 🔹 進頁面自動抓下拉選單
  useEffect(() => {
    fetchCollectionsTypes();
    fetchCollections(); // 頁面一開始先抓全部
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Collection Search</h1>

        <div className={styles.controls}>
          <input
            className={styles.search}
            type="text"
            placeholder="搜尋卡牌彈數名稱或 code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className={styles.search}
            value={collectionType}
            onChange={(e) => setCollectionType(e.target.value)}
          >
            {collectionsTypes.map((type) => (
              <option key={type.id} value={type.id_collection_type}>
                {type.collection_type_name}
              </option>
            ))}
          </select>

          <input
            className={styles.searchYear}
            type="number"
            min="1900"
            max="2100"
            placeholder="年份（例如 2025）"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <button className={styles.searchButton} onClick={fetchCollections}>
            搜尋
          </button>
        </div>

        <div className={styles.collectionGrid}>
          {collections.length === 0 && <p>沒有符合的結果</p>}
          {collections.map((card) => (
            <Link
              key={card.collections_id}
              to={`/card-search/collection/${card.collection_id}`}
              className={styles.collection}
            >
              <div className={styles.cardHeader}>
                <p className={styles.cardTitle}>{card.collection_code}</p>
                <p className={styles.cardTitle}>
                  {collectionsTypes.find(type => type.id_collection_type === card.collection_type)?.collection_type_name || '未知類型'}
                </p>
                <p className={styles.cardType}>{card.release_date}</p>
              </div>

              {card.symbol_url ? (
                <img src={card.symbol_url} alt={card.name_ch} />
              ) : (
                <div className={styles.cardName}>{card.name_ch}</div>
              )}

              <div className={styles.cardFooter}>
                <p className={styles.cardTitle}>{card.collection_name}</p>
                <p className={styles.cardnum}>數量：{card.card_count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

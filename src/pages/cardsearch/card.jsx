import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '@/styles/pages/cardsearch/allCardsSearch.module.scss';
import CardItem from '@/components/common/CardItem';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DeckBuilder() {
  const { collectionId } = useParams();

  // 🔹 後端載入的下拉資料
  const [options, setOptions] = useState({
    energy: [],
    rarity: [],
    specal: [],
    collections: []
  });

  // 🔹 搜尋條件
  const [search, setSearch] = useState('');
  const [energy, setEnergy] = useState('');
  const [rarity, setRarity] = useState('');
  const [specal, setSpecal] = useState('');
  const [collection, setCollection] = useState(collectionId || '');
  const [order, setOrder] = useState('');

  // 🔹 卡片資料
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 分頁
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 50;

  /**
   * ⭐ 取得下拉資料 /api/ref
   */
  useEffect(() => {
    const fetchRefData = async () => {
      try {
        const res = await fetch("/api/ref");
        const data = await res.json();
        setOptions(data);
      } catch (err) {
        console.error("載入下拉資料錯誤", err);
      }
    };

    fetchRefData();
  }, []);

  /**
   * ⭐ 搜尋卡片 GET /api/card
   */
  const fetchCards = async () => {
    setLoading(true);

    const query = new URLSearchParams();

    if (search) query.append("q", search);
    if (energy) query.append("energy", energy);
    if (rarity) query.append("rarity", rarity);
    if (specal) query.append("specal", specal);
    if (collection) query.append("collection", collection);
    if (order) query.append("order", order);

    try {
      const res = await fetch(`/api/card?${query.toString()}`);
      const data = await res.json();
      setCards(data);
      setCurrentPage(1);
    } catch (err) {
      console.error("搜尋卡片錯誤", err);
    }

    setLoading(false);
  };

  /**
   * ➤ 頁面第一次進來就跑一次
   */
  useEffect(() => {
    fetchCards();
  }, []);

  // 分頁處理
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Card Search</h1>

        {/* 🔽 下拉條件 */}
        <div className={styles.inputArea}>
          {/* energy */}
          <select value={energy} onChange={e => setEnergy(e.target.value)} className={styles.search}>
            <option value="">所有屬性</option>
            {options.energy.map((e) => (
              <option key={e.energy_id} value={e.energy_id}>
                {e.energy_ch}
              </option>
            ))}
          </select>

          {/* rarity */}
          <select value={rarity} onChange={e => setRarity(e.target.value)} className={styles.search}>
            <option value="">所有稀有度</option>
            {options.rarity.map((r) => (
              <option key={r.rarity_id} value={r.rarity_id}>
                {r.rarity_ch}
              </option>
            ))}
          </select>

          {/* specal card type */}
          <select value={specal} onChange={e => setSpecal(e.target.value)} className={styles.search}>
            <option value="">所有卡種</option>
            {options.specal.map((s) => (
              <option key={s.specal_id} value={s.specal_id}>
                {s.speca_type_ch}
              </option>
            ))}
          </select>

          {/* collection */}
          <select value={collection} onChange={e => setCollection(e.target.value)} className={styles.search}>
            <option value="">所有系列</option>
            {options.collections.map((c) => (
              <option key={c.collections_id} value={c.collections_id}>
                {c.name_ch}
              </option>
            ))}
          </select>

          {/* 排序 */}
          <select value={order} onChange={e => setOrder(e.target.value)} className={styles.search}>
            <option value="">排序</option>
            <option value="ASC">卡號小到大</option>
            <option value="DESC">卡號大到小</option>
          </select>
        </div>

        {/* 🔍 搜尋列 */}
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Search card name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.search}
          />
          <button onClick={fetchCards} className={styles.searchButton}>
            搜尋
          </button>
        </div>

        {loading && <p>資料載入中...</p>}

        {/* 卡片列表 */}
        <section className={styles.layout}>
          <article className={styles.card}>
            <h2>All card</h2>
            <div className={styles.cardList}>
              {currentCards.map((card, idx) => (
                <CardItem key={idx} collectionId={collectionId} card={card} />
              ))}
            </div>
          </article>
        </section>

        {/* 分頁 */}
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
      </div>
      <Footer />
    </>
  );
}

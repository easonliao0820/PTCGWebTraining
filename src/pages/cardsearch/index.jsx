import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from '@/styles/pages/cardsearch/allCardsSearch.module.scss';
import CardItem from '@/components/common/CardItem';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DeckBuilder() {

  const { collectionId } = useParams();

  // meta options
  const [energy, setEnergy] = useState([]);
  const [rarity, setRarityList] = useState([]);
  const [specal, setSpecal] = useState([]);
  const [collections, setCollections] = useState([]);

  // cards
  const [cards, setCards] = useState([]);

  // filters (用數字 id，預設 0 表示全部)
  const [search, setSearch] = useState('');
  const [attribute, setAttribute] = useState(0);
  const [collection, setCollection] = useState(collectionId || 0);
  const [rarityFilter, setRarity] = useState(0);
  const [category, setCategory] = useState(0);

  const [hp, setHp] = useState('');

  // paging
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 50;

  // 取得 dropdown meta（/refs）
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await fetch("http://localhost:3000/refs");
        const data = await res.json();

        setEnergy([{ energy_id: 0, energy_ch: '所有屬性' }, ...data.energy]);
        setRarityList([{ rarity_id: 0, rarity_en: '所有稀有度' }, ...data.rarity]);
        setSpecal([{ specal_id: 0, speca_type_ch: '所有類型' }, ...data.specal]);
        setCollections([{ collections_id: 0, name_ch: '所有彈數' }, ...data.collections]);
      } catch (err) {
        console.error("Meta fetch failed:", err);
      }
    };

    fetchMeta();
  }, []);

  // 初次載入自動抓卡片
  useEffect(() => {
    fetchCards();
  }, []); // 空陣列 → 只在 mount 執行一次

  // 呼叫後端取卡片
  const fetchCards = async () => {
    let url = "http://localhost:3000/cards?";

    if (search) url += `q=${search}&`;
    if (attribute != 0) url += `energy=${attribute}&`;
    if (rarityFilter != 0) url += `rarity=${rarityFilter}&`;
    if (category != 0) url += `specal=${category}&`;
    if (collection != 0) url += `collection=${collection}&`;

    const res = await fetch(url);
    const data = await res.json();

    setCards(data);
    setCurrentPage(1);
  };

  // Paging
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Card Search</h1>

        {/* ===== Filter Selects ===== */}
        <div className={styles.inputArea}>

          {/* 類型 (specal) */}
          <select value={category} onChange={e => setCategory(e.target.value)} className={styles.search}>
            {specal.map((cat) => (
              <option key={cat.specal_id} value={cat.specal_id}>{cat.speca_type_ch}</option>
            ))}
          </select>
          {/* 彈數 */}
          <select value={collection} onChange={e => setCollection(e.target.value)} className={styles.search}>
            {collections.map((col) => (
              <option key={col.collections_id} value={col.collections_id}>{col.name_ch}</option>
            ))}
          </select>

          {/* 屬性 */}
          <select value={attribute} onChange={e => setAttribute(e.target.value)} className={styles.search}>
            {energy.map((attr) => (
              <option key={attr.energy_id} value={attr.energy_id}>{attr.energy_ch}</option>
            ))}
          </select>

          {/* 稀有度 */}
          <select value={rarityFilter} onChange={e => setRarity(e.target.value)} className={styles.search}>
            {rarity.map((ra) => (
              <option key={ra.rarity_id} value={ra.rarity_id}>{ra.rarity_en}</option>
            ))}
          </select>

        </div>

        {/* ===== text inputs ===== */}
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.search}
          />

          <input
            type="number"
            placeholder="最低 HP （例如：120）"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className={styles.search}
          />
          <button onClick={fetchCards} className={styles.searchButton}>搜尋</button>
        </div>

        {/* ===== Cards Display ===== */}
        <section className={styles.layout}>
          <article className={styles.card}>
            <h2>All cards</h2>
            <div className={styles.cardList}>
              {currentCards.map((card, idx) => (
                <CardItem key={idx} collectionId={collectionId} card={card} />
              ))}
            </div>
          </article>
        </section>

        {/* ===== Pagination ===== */}
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

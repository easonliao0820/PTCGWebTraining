import { useState } from 'react';
import { cardData } from '@/data/cards';
import { collectionData } from '@/data/collection';
import { stageData } from '@/data/stage';
import styles from '@/styles/pages/cardsearch/allCardsSearch.module.scss';
import CardItem from '@/components/common/CardItem';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DeckBuilder() {
  const { collectionId } = useParams(); 
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('所有類別');
  const [attribute, setAttribute] = useState('所有屬性');
  const [collection, setCollection] = useState(collectionId||'所有彈數');
  const [stage, setStage] = useState('所有階段');
  const [rarity, setRarity] = useState('稀有度');
  const [cardId, setCardId] = useState('');
  const [hp, setHp] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 50;
  const categories = ['所有類別', ...new Set(cardData.map(card => card.type || '未知'))];
  const attributes = ['所有屬性', ...new Set(cardData.map(card => card.attribute || '未知'))];
  const collections = ['所有彈數', ...new Set(collectionData.map(card => card.name))];
  const stages = ['所有階段', ...new Set(stageData.map(stage => stage.name))];
  const raritys = ['所有稀有度', ...new Set(stageData.map(stage => stage.name))];

  const filteredCards = cardData.filter(card =>
    card.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '所有類別' || card.type === category) &&
    (attribute === '所有屬性' || card.attribute === attribute)
  );
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = filteredCards.slice(startIndex, startIndex + cardsPerPage);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Card Search</h1>
        <div className={styles.inputArea}>
          <select value={category} onChange={e => setCategory(e.target.value)} className={styles.search}>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          <select value={collection} onChange={e => setCollection(e.target.value)} className={styles.search}>
            {collections.map((col, idx) => (
              <option key={idx} value={col}>{col}</option>
            ))}
          </select>

          <select value={attribute} onChange={e => setAttribute(e.target.value)} className={styles.search}>
            {attributes.map((attr, idx) => (
              <option key={idx} value={attr}>{attr}</option>
            ))}
          </select>
          <select value={stage} onChange={e => setStage(e.target.value)} className={styles.search}>
            {stages.map((sta, idx) => (
              <option key={idx} value={sta}>{sta}</option>
            ))}
          </select>
          <select value={rarity} onChange={e => setRarity(e.target.value)} className={styles.search}>
            {raritys.map((sta, idx) => (
              <option key={idx} value={sta}>{sta}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.search}
          />
          <input
            type="text"
            placeholder="Search cards id..."
            value={cardId}
            onChange={e => setCardId(e.target.value)}
            className={styles.search}
          />
          <input
            className={styles.search}
            type="number"
            placeholder="HP血量 （例如：120）"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />

          <button className={styles.searchButton}>搜尋</button>
        </div>
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

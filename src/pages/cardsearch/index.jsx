import { useState } from 'react';
import { cardData } from '@/data/cards';
import { collectionData } from '@/data/collection';
import styles from '@/styles/pages/cardsearch/allCardsSearch.module.scss';
import CardItem from '@/components/common/CardItem';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DeckBuilder() {
  const [search, setSearch] = useState('');
  const [deskName, setdDeskName] = useState('');
  const [category, setCategory] = useState('所有類別');
  const [attribute, setAttribute] = useState('所有屬性');
  const [collection, setCollection] = useState('所有彈數');

  const categories = ['所有類別', ...new Set(cardData.map(card => card.type || '未知'))];
  const attributes = ['所有屬性', ...new Set(cardData.map(card => card.attribute || '未知'))];
  const collections = ['所有彈數', ...new Set(collectionData.map(card => card.name))];

  const filteredCards = cardData.filter(card =>
    card.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '所有類別' || card.type === category) &&
    (attribute === '所有屬性' || card.attribute === attribute)
  );

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Deck Builder</h1>
       
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={styles.search}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={collection}
            onChange={e => setCollection(e.target.value)}
            className={styles.search}
          >
            {collections.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={attribute}
            onChange={e => setAttribute(e.target.value)}
            className={styles.search}
          >
            {attributes.map((attr, idx) => (
              <option key={idx} value={attr}>{attr}</option>
            ))}
          </select>
        </div>
        <section className={styles.layout}>
          <article className={styles.card}>
            <h2>All card</h2>
            <div className={styles.cardList}>
              {filteredCards.map((card, idx) => (
                <CardItem key={idx} card={card} onAdd={() => addToDeck(card)} />
              ))}
            </div>
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}

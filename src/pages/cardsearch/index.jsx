import { useState } from 'react';
import styles from '@/styles/pages/cardsearch/allCardsSearch.module.scss';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AddCardItem from '@/components/common/AddCardItem';
// import RemoveCardItem from '@/components/common/RemoveCardItem';
import { cardData } from '@/data/cards';
import { collectionData} from '@/data/collection';

export default function DeckBuilder() {
  const [search, setSearch] = useState('');
  const [deck, setDeck] = useState([]);
  const [category, setCategory] = useState('所有類別');
  const [attribute, setAttribute] = useState('所有屬性');
  const [collection, setCollection] = useState('所有彈數');

  const categories = ['所有類別',, ...new Set(cardData.map(card => card.type))];
  const attributes = ['所有屬性', ...new Set(cardData.map(card => card.attribute))];
  const collections = ['所有彈數', ...new Set(collectionData.map(card => card.name))];

  const filteredCards = cardData.filter(card =>
  (category === '所有屬性' || card.type === category) &&
  (attribute === '所有屬性' || card.attribute === attribute) &&
  card.name.toLowerCase().includes(search.toLowerCase())
);

  const addToDeck = (card) => {
    if (deck.length >= 60) return; // 最多 60 張
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
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="搜尋卡牌名稱..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />

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
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={styles.search}
          >
            {categories.map((cat, idx) => (
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
          <article>
            <h2>All card</h2>
            <div className={styles.cardList}>
              {filteredCards.map((card, idx) => (
                <AddCardItem key={idx} card={card} onAdd={() => addToDeck(card)} />
              ))}
            </div>
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}

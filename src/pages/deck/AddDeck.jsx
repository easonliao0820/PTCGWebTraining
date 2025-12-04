import { useState } from 'react';
import { cardData } from '@/data/cards';
import styles from '@/styles/pages/deck/addDeck.module.scss';
import AddCardItem from '@/components/common/AddCardItem';
import RemoveCardItem from '@/components/common/RemoveCardItem';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DeckBuilder() {
  const [search, setSearch] = useState('');
  const [deckName, setdDeckName] = useState('');
  const [deck, setDeck] = useState([]);
  const [category, setCategory] = useState('所有類別');
  const [attribute, setAttribute] = useState('所有屬性');

  const categories = ['所有類別', ...new Set(cardData.map(card => card.type || '未知'))];
  const attributes = ['所有屬性', ...new Set(cardData.map(card => card.attribute || '未知'))];

  const filteredCards = cardData.filter(card =>
    card.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '所有類別' || card.type === category) &&
    (attribute === '所有屬性' || card.attribute === attribute)
  );

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
         <div className={styles.AddDeck}>
          <h4>新增的清單名稱 : </h4>
          <input
            type="text"
            placeholder="Deck Name."
            value={deckName}
            onChange={(e) => setdDeckName(e.target.value)}
            className={styles.search}
          />
          <button className={styles.save}>儲存</button>
          <button className={styles.cancel}>取消</button>
        </div>
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
            value={attribute}
            onChange={e => setAttribute(e.target.value)}
            className={styles.search}
          >
            {attributes.map((attr, idx) => (
              <option key={idx} value={attr}>{attr}</option>
            ))}
          </select>
          <button className={styles.searchButton}>儲存</button>
        </div>
        <section className={styles.layout}>
          <article className={styles.card}>
            <h2>All card</h2>
            <div className={styles.cardList}>
              {filteredCards.map((card, idx) => (
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

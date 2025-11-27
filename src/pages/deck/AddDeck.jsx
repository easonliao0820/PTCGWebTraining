import { useState } from 'react';
import styles from '@/styles/pages/deck/addDeck.module.scss';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AddCardItem from '@/components/common/AddCardItem';
import RemoveCardItem from '@/components/common/RemoveCardItem';
import { cardData } from '@/data/cards';

export default function DeckBuilder() {
  const [search, setSearch] = useState('');
  const [deskName, setdDeskName] = useState('');
  const [deck, setDeck] = useState([]);
  const [category, setCategory] = useState('所有類別');
  const [attribute, setAttribute] = useState('所有屬性');

  const categories = ['所有類別',, ...new Set(cardData.map(card => card.type))];
  const attributes = ['所有屬性', ...new Set(cardData.map(card => card.attribute))];

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
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />

          <input
            type="text"
            placeholder="Desk Name."
            value={deskName}
            onChange={(e) => setdDeskName(e.target.value)}
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
          <article>
            <h2>My Deck ({deck.length}/60)</h2>
            <div className={styles.deckList}>
              {deck.map((card, idx) => (
                <RemoveCardItem key={idx} card={card} onRemove={() => removeFromDeck(card)} />
              ))}
            </div>
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}

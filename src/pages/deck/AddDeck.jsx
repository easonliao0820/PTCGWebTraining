import  { useState } from 'react';
import styles from '@/styles/pages/deck/addDeck.module.scss';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AddCardItem from '@/components/common/AddCardItem';
import RemoveCardItem from '@/components/common/RemoveCardItem';
import { cardData } from '@/data/cards';

export default function DeckBuilder() {
  const [search, setSearch] = useState('');
  const [deck, setDeck] = useState([]);

  const filteredCards = cardData.filter((card) =>
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

        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

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

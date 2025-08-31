import cardtest from '@/assets/images/cards/M1L001.png';
import styles from '@/styles/components/common/CardItem.module.scss';

export default function AddCardItem({ card, onAdd }) {
  return (
    <div className={styles.card} onClick={onAdd}>
      <img src={`${card.image}`} alt={card.name} />
      <p>{card.name}</p>
      <button className={styles.button} onClick={onAdd}>+</button>
    </div>
  );
}

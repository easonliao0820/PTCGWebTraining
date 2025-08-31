import cardtest from '@/assets/images/cards/M1L001.png';
import styles from '@/styles/components/common/CardItem.module.scss';

export default function RemoveCardItem({ card, onRemove }) {
  return (
    <div className={styles.card} onClick={onRemove}>
      <img src={cardtest} alt={card.name} />
    </div>
  );
}

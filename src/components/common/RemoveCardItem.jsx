import styles from '@/styles/components/common/actionCardItem.module.scss';

export default function RemoveCardItem({ card, onRemove }) {
  return (
    <div className={styles.card} onClick={onRemove}>
      <img className={styles.removeimg} assName src={card.image} alt={card.name} />
    </div>
  );
}
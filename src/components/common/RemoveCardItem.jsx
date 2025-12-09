import styles from '@/styles/components/common/actionCardItem.module.scss';

export default function RemoveCardItem({ card, onRemove }) {
  return (
    <div className={styles.card} onClick={onRemove}>
      <img className={styles.removeimg} src={card.image_url} alt={card.name} />
    </div>
  );
}
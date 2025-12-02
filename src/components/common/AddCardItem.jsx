import styles from '@/styles/components/common/actionCardItem.module.scss';

export default function AddCardItem({ card, onAdd }) {
  return (
    <div className={styles.card} onClick={onAdd}>
      <img className={styles.addimg} src={`${card.image}`} alt={card.name}/>
      <p>{card.name}</p>
      <button className={styles.button} onClick={onAdd}>+</button>
    </div>
  );
}

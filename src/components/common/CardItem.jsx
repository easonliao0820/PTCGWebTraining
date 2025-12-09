import styles from '@/styles/components/common/CardItem.module.scss';
import { Link } from 'react-router-dom';

export default function CardItem({ card,collectionId, onAdd }) {
  return (
    <Link to={`/card-search/collection/${collectionId}/${card.card_id}`} className={styles.card} onClick={onAdd}>
      <img className={styles.addimg} src={`${card.image_url}`} alt={card.name}/>
      <p>{card.name}</p>
    </Link>
  );
}

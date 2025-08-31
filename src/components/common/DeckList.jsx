import RemoveCardItem from '@/components/common/RemoveCardItem';

export default function DeckList({ deck, onRemove }) {
  return (
    <ul>
      {deck.map((card, idx) => (
        <li key={idx}>
          {card.name}
          <button onClick={() => onRemove(idx)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

import styles from "@/styles/pages/cardsearch/cardinfo.module.scss";

export default function CardDetail({ card }) {
  if (!card) return <p>卡牌不存在</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => history.back()} className={styles.backBtn}>
        ← 返回
      </button>

      <h2 className={styles.collection}>系列：{card.collectionName}</h2>

      <div className={styles.content}>
        <img className={styles.image} src={card.image_url} alt={card.name} />

        <div className={styles.info}>
          <h1 className={styles.name}>
            {card.name}
            {card.special_card_type && (
              <span className={styles.special}>{card.special_card_type}</span>
            )}
          </h1>

          <div className={styles.meta}>
            <p>HP：{card.hp}</p>
            <p>屬性：{card.energy_type}</p>
            <p>稀有度：{card.rarity}</p>
            <p>階段：{card.stage}</p>
            <p>卡號：{card.number_in_collections}</p>
          </div>

          <div className={styles.block}>
            <h3>卡牌效果</h3>
            <p>{card.info}</p>
          </div>

          <div className={styles.block}>
            <h3>弱點 / 抗性 / 退場費用</h3>
            <p>弱點：{card.weakness || "無"}</p>
            <p>抗性：{card.resistance || "無"}</p>
            <p>退場費用：{card.retreat_cost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

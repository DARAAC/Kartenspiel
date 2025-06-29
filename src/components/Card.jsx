function Card({ card }) {
  if (!card) return null;
  return (
    <img src={card.image} alt={card.code} className="card" />
  );
}

export default Card;

function ScoreBoard({ playerCards, dealerCards, calculateScore }) {
  return (
    <div className="score-board">
      <p>Spieler-Punkte: {calculateScore(playerCards)}</p>
      <p>Dealer-Punkte: {calculateScore(dealerCards)}</p>
    </div>
  );
}

export default ScoreBoard;

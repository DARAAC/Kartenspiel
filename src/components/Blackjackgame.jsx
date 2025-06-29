import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import ScoreBoard from './Scoreboard.jsx';

const API = 'https://deckofcardsapi.com/api/deck';

function BlackjackGame() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function initDeck() {
      const res = await fetch(`${API}/new/shuffle/?deck_count=1`);
      const data = await res.json();
      setDeckId(data.deck_id);
    }
    initDeck();
  }, []);

  const drawCard = async () => {
  if (!deckId) throw new Error('Kein Deck verfügbar');
  const res = await fetch(`${API}/${deckId}/draw/?count=1`);
  const data = await res.json();
  if (!data.cards || data.cards.length === 0) throw new Error('Keine Karten mehr im Deck');
  return data.cards[0];
};


  const calculateScore = (cards) => {
    let total = 0;
    let aces = 0;

    for (let card of cards) {
      if (['KING', 'QUEEN', 'JACK'].includes(card.value)) total += 10;
      else if (card.value === 'ACE') {
        total += 11;
        aces += 1;
      } else total += parseInt(card.value);
    }

    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  };

  const startGame = async () => {
  if (!deckId) return;

  setGameOver(false);
  setMessage('');
  setDealerCards([]);
  setPlayerCards([]);

  try {
    const card1 = await drawCard();
    const card2 = await drawCard();
    const dealerCard = await drawCard();

    setPlayerCards([card1, card2]);
    setDealerCards([dealerCard]);
  } catch (err) {
    setMessage('Fehler beim Kartenziehen.');
  }
};


  const hit = async () => {
    const newCard = await drawCard();
    const newHand = [...playerCards, newCard];
    setPlayerCards(newHand);

    if (calculateScore(newHand) > 21) {
      setGameOver(true);
      setMessage('Du hast verloren (über 21)!');
    }
  };

  const stand = async () => {
    let dealerHand = [...dealerCards];

    while (calculateScore(dealerHand) < 17) {
      const card = await drawCard();
      dealerHand.push(card);
    }

    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerHand);

    setDealerCards(dealerHand);
    setGameOver(true);

    if (dealerScore > 21 || playerScore > dealerScore) {
      setMessage('Du gewinnst!');
    } else if (playerScore === dealerScore) {
      setMessage('Unentschieden!');
    } else {
      setMessage('Dealer gewinnt!');
    }
  };

  return (
    <div className="game-container">
      <ScoreBoard playerCards={playerCards} dealerCards={dealerCards} calculateScore={calculateScore} />

      <div className="cards">
        <h2>Deine Karten</h2>
        <div className="card-row">
          {playerCards.map((card) => <Card key={card.code} card={card} />)}
        </div>

        <h2>Dealer</h2>
        <div className="card-row">
          {dealerCards.map((card) => <Card key={card.code} card={card} />)}
        </div>
      </div>

      <div className="controls">
        {!gameOver ? (
          <>
            <button onClick={hit}>Karte ziehen (Hit)</button>
            <button onClick={stand}>Passen (Stand)</button>
          </>
        ) : (
          <button onClick={startGame}>Neues Spiel</button>
        )}
      </div>

      <h3>{message}</h3>
    </div>
  );
}

export default BlackjackGame;

import './App.css';
import BlackjackGame from './components/Blackjackgame'; 


function App() {
  console.log("App component is rendering")

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <BlackjackGame />
    </div>
  );
}

export default App;

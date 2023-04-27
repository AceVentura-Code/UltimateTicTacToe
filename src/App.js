import './App.css';
import Board from './Components/Board.component';
import ControlPannel from './Components/ControlPannel.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Ultimate Tic Tac Toe
        </h2>
        <h5>I heard you like tic tac toe</h5>
      </header>
      <ControlPannel />
      <Board/>
      <footer>end</footer>
    </div>
  );
}

export default App;

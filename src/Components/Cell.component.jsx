import "./Cell.css";
import { playerOne, playerTwo } from "../Constants";
import ControlPannel from "../Components/ControlPannel.component";

function GameCell({ cell, player, colorSwap, playerOneChar, playerTwoChar }) {
  let text = cell === 1 ? playerOneChar : cell === -1 ? playerTwoChar : " ";

  return (
    <div className="cell">
      <button disabled={player === 0} className={`btn ${colorSwap} cellBtn`}>
        {text}
      </button>
    </div>
  );
}

export default GameCell;

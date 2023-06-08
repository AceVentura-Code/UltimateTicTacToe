import './Cell.css';
import { playerOne, playerTwo } from '../Constants';

function GameCell({cell, player ,colorSwap, isAvailable}) {


    let text = cell === 1 ? playerOne : cell === -1 ? playerTwo : " "


    return (
        <div className='cell' >
            <button disabled={player===0} className={`btn ${colorSwap} cellBtn`}>{text}</button>
        </div>
    );
}

export default GameCell;

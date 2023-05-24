import { useState } from 'react';
import './GameBoard.css';
import SubGame from './SubGame.component';

function GameBoard({player, onPlayerMove}) {
    const [GameStatus, setSubGameStatus] = useState(false);
    // const [timer, setTimer] = useState();
    const majorGames = Array(9).fill(0)

    return (
        <div className="container board">
            <p>Test Board</p>
            <div className="row">
                {majorGames.map((item, index) => (
                    <SubGame key={index} status={GameStatus}  player={player} onPlayerMove={onPlayerMove} />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;

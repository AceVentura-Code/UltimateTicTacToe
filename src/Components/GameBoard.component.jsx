import { useState } from 'react';
import './GameBoard.css';
import SubGame from './SubGame.component';

function GameBoard() {
    const [GameStatus, setSubGameStatus] = useState(false);
    // const [timer, setTimer] = useState();
    const majorGames = Array(9).fill(0)

    return (
        <div className="container board">
            <p>Test Board</p>
            <div className="row">
                {majorGames.map((item) => (
                    <SubGame status={GameStatus} />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;

import { useState, useEffect } from 'react';
import './GameBoard.css';
import SubGame from './SubGame.component';

function GameBoard({ player, onPlayerMove, gameStarted, onGameStart }) {
    // const [subGameStatus, setSubGameStatus] = useState(false);
    // const [timer, setTimer] = useState();
    // const majorGames = Array(9).fill(0)
    const [majorGames, setMajorGames] = useState(Array(9).fill(0));

    useEffect(() => {
        if (gameStarted) {
            // setSubGameStatus(gameStarted);
            setMajorGames(Array(9).fill(0));
        }
    }, [gameStarted]);

    return (
        <div className="container board">
            <p>Test Board</p>
            <div className="row">
                {majorGames.map((item, index) => (
                    <SubGame key={index} gameStarted={gameStarted} player={player} onPlayerMove={onPlayerMove} />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;

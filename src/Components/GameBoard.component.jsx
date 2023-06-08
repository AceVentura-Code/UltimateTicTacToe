import { useState, useEffect } from 'react';
import './GameBoard.css';
import SubGame from './SubGame.component';

function GameBoard({ player, onPlayerMove, gameStarted, onGameStart }) {

    const [majorGames, setMajorGames] = useState(Array(9).fill(0));

    //Use -1 to alllow any or a number [0, 8] to restrict by index
    const [nextBoard, setNextBoard] = useState(-1);

    const onBoardMove = (indexMove, index, isComplete) => {
        if (isComplete) { setNextBoard(-1); }
        else { setNextBoard(indexMove); }
    }

    useEffect(() => {
        if (gameStarted) {
            setMajorGames(Array(9).fill(0));
        }
    }, [gameStarted]);

    return (
        <div className="container board">
            <p>Test Board</p>
            <div className="row">
                {majorGames.map((item, index) => (
                    <SubGame key={index.toString()} indexOut={index} gameStarted={gameStarted} player={player} onPlayerMove={onPlayerMove} isAvailable={nextBoard === -1 || nextBoard === index} onBoardMove={onBoardMove} />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;

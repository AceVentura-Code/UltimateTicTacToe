import './SubGame.css';
import GameCell from './Cell.component';
import { useState, useEffect } from 'react';

function SubGame({ indexOut, gameStarted, player, onPlayerMove, isAvailable, onBoardMove }) {

    // const minorGames =
    const [minorGames, setMinorGames] = useState(Array(9).fill(0));
    const [colorSwap, setColorSwap] = useState("blue-color");
    const [isComplete, setIsComplete] = useState(false);
    
    useEffect(() => {
        if (gameStarted) {
            setMinorGames(Array(9).fill(0));
        }
    }, [gameStarted]);

    useEffect(() => {
        if(minorGames.filter(x => x==0).length == 0){
            setIsComplete(true);
        }

    }, [minorGames]);

    const onCellClick = (index) => {
        console.log("GameStatus" + gameStarted);
        console.log("isAvailable" + isAvailable);

        if ( !gameStarted || !isAvailable || minorGames[index] !== 0) { return; }
            minorGames[index] = player;
            console.log(minorGames);
            onPlayerMove();
            onBoardMove(index, indexOut, (minorGames.filter(x => x == 0).length == 0));

            if (minorGames.filter(x => x == 0).length === 0) {
                //swap with wining check
                if (minorGames.filter(x => x === 1).length === minorGames.filter(x => x === -1).length) {
                    setColorSwap("yellow-color");
                }
                else if (minorGames.filter(x => x === 1).length > minorGames.filter(x => x === -1).length) {
                    setColorSwap("green-color");
                }
                else {
                    setColorSwap("red-color");
                }
            }
    }


    return (
        <div className='col-md-4'>
            <div className={`container subgame ${isAvailable ? 'selectable-board' : ''}`}>
                <div className="row">
                    {minorGames.map((item, index) => (
                        <div key={index.toString() + "of" + indexOut.toString()} className='col-md-4' onClick={e => { onCellClick(index); }}>
                            <GameCell cell={item} colorSwap={colorSwap} isAvailable={isAvailable} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubGame;

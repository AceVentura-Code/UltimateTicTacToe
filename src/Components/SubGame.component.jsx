import './SubGame.css';
import GameCell from './Cell.component';
import { useState } from 'react';

function SubGame({ key, gameStatus, player, onPlayerMove }) {

    // const minorGames =
    const [minorGames, setminorGames] = useState(Array(9).fill(0));
    // function setPlayerCell(index, player) {
    //     minorGames[index] = player;
    //     console.log(minorGames); setPlayerCell(index, player);
    // }
    const onCellClick = (index) => {
        console.log("GameStatus" + gameStatus);
        
        if (!gameStatus || minorGames[index] !== 0) { return; }
        minorGames[index] = player;
        console.log(minorGames);
        onPlayerMove()

        if(minorGames.some(x=>x===0)){

        }
    }


    return (
        <div className='col-md-4'>
            <div className='container subgame'>
                <div className="row">
                    {minorGames.map((item, index) => (
                        <div className='col-md-4' onClick={e => { onCellClick(index);  }}>
                            <GameCell key={index} cell={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubGame;

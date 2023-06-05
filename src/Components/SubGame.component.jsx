import './SubGame.css';
import GameCell from './Cell.component';
import { useState, useEffect } from 'react';

function SubGame({ gameStarted, player, onPlayerMove }) {

    // const minorGames =
    const [minorGames, setMinorGames] = useState(Array(9).fill(0));
    const [colorSwap, setColorSwap] = useState("btn-primary");
    // function setPlayerCell(index, player) {
    //     minorGames[index] = player;
    //     console.log(minorGames); setPlayerCell(index, player);
    // }
    
    useEffect(() => {
        if (gameStarted) { 
            setMinorGames(Array(9).fill(0));
            console.log(minorGames);
        }
    }, [gameStarted]);

    // useEffect(() => {
    
    //     if(minorGames.filter(x => x==0).length == 0){

    //     }
    // }, [minorGames]);

    const onCellClick = (index) => {
        console.log("GameStatus" + gameStarted);
        
        if (!gameStarted || minorGames[index] !== 0) { return; }
        minorGames[index] = player;
        console.log(minorGames);
        onPlayerMove()

        // if(minorGames.some(x=>x===0)){
        // }
        if(minorGames.filter(x => x==0).length === 0){
            //swap with wining check
            if(minorGames.filter(x => x===1).length === minorGames.filter(x => x===-1).length ){
                setColorSwap("btn-secondary");
            }
            else if(minorGames.filter(x => x===1).length > minorGames.filter(x => x===-1).length ){
                setColorSwap("btn-success");
            }
            else {
                setColorSwap("btn-danger");
            }
        }
    }


    return (
        <div className='col-md-4'>
            <div className='container subgame'>
                <div className="row">
                    {minorGames.map((item, index) => (
                        <div className='col-md-4' onClick={e => { onCellClick(index);  }}>
                            <GameCell key={index} cell={item} colorSwap={colorSwap}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubGame;

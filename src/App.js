import './App.css';
import React, {useEffect, useState} from 'react';
import GameBoard from './Components/GameBoard.component';
import ControlPannel from './Components/ControlPannel.component';
import {TIMEOUTGAME} from "./Constants";

function App() {

    const [gameStarted, setGameStarted] = useState(false);
    const [player, setPlayer] = useState(1); // values:  1 || -1 // multiply by -1 to switch
    const [vsAi, setVsAi] = useState(false);
    const [gamemode, setGamemode] = useState(false);


    const switchPlayers = () => {
        setPlayer(player * -1);
        console.log("now turn of player " + 
        ( player === 1 ? 'X' : 'O' ) + `(${player})`
        )
    }

    const [timer, setTimer] = useState(TIMEOUTGAME);
    useEffect(() => {
        let timerId;
        if (gameStarted) {
            let nextTimer;
            timerId = setInterval(() => {
                setTimer((previousState) => {
                    nextTimer = previousState - 1;
                    return nextTimer;
                });
                if (nextTimer === 0) {
                    setGameStarted(false);
                }
            }, 1000);
        } else if (timer !== TIMEOUTGAME) {
            setTimer(TIMEOUTGAME);
        }
        return() => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [gameStarted]);

    useEffect(() => {
        setTimer(TIMEOUTGAME)
    }, [player]);


    const StartGame = () => {
        if (gameStarted === true) {
            setGameStarted(false);
        } else {
            setGameStarted(true);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    Ultimate Tic Tac Toe
                </h2>
                <h5>I heard you like tic tac toe</h5>
            </header>
            <div className='container mainDiv'>
                <div className='row'>
                    <div className="col-md-4">
                        <ControlPannel gameStarted={gameStarted}
                            onGameStart={StartGame}
                            timer={timer}
                            player={player}
                            vsAi={vsAi}
                            setVsAi={setVsAi}
                            gamemode={gamemode}
                            setGamemode={setGamemode}
                                />
                    </div>
                    <div className="col-md-8">
                        <GameBoard player={player}
                            onPlayerMove={switchPlayers}
                            gameStarted={gameStarted} 
                            onGameStart={StartGame}
                            gamemode={gamemode}
                            vsAi={vsAi}
                            />
                    </div>
                </div>
            </div>

            <footer className="App-footer">end</footer>
        </div>
    );
}

export default App;

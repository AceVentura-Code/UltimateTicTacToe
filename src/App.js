import './App.css';
import React, {useEffect, useState} from 'react';
import GameBoard from './Components/GameBoard.component';
import ControlPannel from './Components/ControlPannel.component';
import {TOTAL_GAME_TIME} from "./Constants";

function App() {

    const [gameStarted, setGameStarted] = useState(false);
    const [player, setPlayer] = useState(1); // values:  1 || -1 // multiply by -1 to switch
    const [vsAi, setVsAi] = useState(false);
    const [gamemode, setGamemode] = useState(false);
    const [playerOneName, setPlayerOneName] = useState("Player One");
    const [playerTwoName, setPlayerTwoName] = useState("Player Two");
    const [playerOneChar, setPlayerOneChar] = useState("X");
    const [playerTwoChar, setPlayerTwoChar] = useState("O");
    const [firstMove, setFirstMove] = useState(true);


    const switchPlayers = () => {
        setPlayer(player * -1);
        console.log("now turn of player " + 
        ( player === 1 ? 'X' : 'O' ) + `(${player})`
        )
    }

    const [timer, setTimer] = useState(TOTAL_GAME_TIME);
    const [playerOneTimer, setPlayerOneTimer] = useState (TOTAL_GAME_TIME);
    const [playerTwoTimer, setPlayerTwoTimer] = useState (TOTAL_GAME_TIME);

    
    useEffect(() => {
        let playerOneTimerId;
        let playerTwoTimerId;


        const resetTimer = () => {
            setTimer(TOTAL_GAME_TIME);
        };


        const controlTimeout = (player) => {
            if(player===1 ){
                alert("O jogador \"" + playerTwoName + "\" Ganhou o jogo!! Tempo esgotado para " + playerOneName + "!");
            } else {
                alert("O jogador \"" + playerOneName + "\" Ganhou o jogo!! Tempo esgotado para " + playerTwoName + "!");
            }
            setGameStarted(false);
        };
        
        if (gameStarted) {
            clearInterval(playerOneTimerId);
            clearInterval(playerTwoTimerId);

            if (player === 1) {
                playerOneTimerId = setInterval(() => {
                    setPlayerOneTimer((previousState) => {
                    const nextTimer1 = previousState - 1;
                    if (nextTimer1 === 0) {
                        controlTimeout(1);
                    }
                    return nextTimer1;
                    });
                }, 1000);
                if (firstMove) {
                    alert(`${playerOneName} começa`);
                    setFirstMove(false);
                }
                }
            if (player === -1){
                playerTwoTimerId = setInterval(() => {
                    setPlayerTwoTimer((previousState) => {
                    const nextTimer2 = previousState - 1;
                    if (nextTimer2 === 0) {
                        controlTimeout(-1);
                    }
                    return nextTimer2;
                    });
                }, 1000);
                if (firstMove) {
                    alert(`${playerTwoName} começa`);
                    setFirstMove(false);
                }
            }
            }

            return () => {
                clearInterval(playerOneTimerId);
                clearInterval(playerTwoTimerId);
            };
        }, [gameStarted, player]);

        useEffect(() => {
            if (player === 1 && playerOneTimer === 0) {
                alert(`Tempo esgotado! O jogador "${playerOneName}" perdeu.`);
                setGameStarted(false);
            } else if (player === -1 && playerTwoTimer === 0) {
                alert(`Tempo esgotado! O jogador "${playerTwoName}" perdeu.`);
                setGameStarted(false);
            }
        }, [player, playerOneTimer, playerTwoTimer]);



        useEffect(() => {
            if (!gameStarted) {
                setPlayerOneTimer(TOTAL_GAME_TIME);
                setPlayerTwoTimer(TOTAL_GAME_TIME);
                setTimer(TOTAL_GAME_TIME);
            }
        }, [gameStarted]);
        


    useEffect(() => {
        if (!gameStarted) {
            setTimer(TOTAL_GAME_TIME);
        }
    }, [gameStarted]);


    const StartGame = () => {
        if (gameStarted === true) {
            setGameStarted(false);
        } else {
            setPlayer(Math.random() < 0.5 ? 1 : -1);
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
                            timer1={playerOneTimer}
                            timer2={playerTwoTimer}
                            player={player}
                            vsAi={vsAi}
                            setVsAi={setVsAi}
                            setGamemode={setGamemode}
                            setPlayerOneChar={setPlayerOneChar}
                            setPlayerTwoChar={setPlayerTwoChar}
                            setPlayerOneName={setPlayerOneName}
                            setPlayerTwoName={setPlayerTwoName}
                            playerOneChar={playerOneChar}
                            playerTwoChar={playerTwoChar}/>
                    </div>
                    <div className="col-md-8">
                        <GameBoard player={player}
                            onPlayerMove={switchPlayers}
                            gameStarted={gameStarted}
                            setGameStarted={setGameStarted}
                            onGameStart={StartGame}
                            gamemode={gamemode}
                            vsAi={vsAi}
                            playerOneChar={playerOneChar}
                            playerOneName={playerOneName}
                            playerTwoChar={playerTwoChar}
                            playerTwoName={playerTwoName}/>
                    </div>
                </div>
            </div>

            <footer className="App-footer">end</footer>
        </div>
    );
}

export default App;

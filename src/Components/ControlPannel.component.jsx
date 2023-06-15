import { useState, useEffect } from 'react';
import './ControlPannel.css';

function ControlPannel({ gameStarted, onGameStart, timer1, timer2, vsAi, setVsAi, setGamemode, setPlayerOneChar, setPlayerTwoChar, setPlayerOneName, setPlayerTwoName, playerOneChar, playerTwoChar }) {


    useEffect(() => {

        if (vsAi) {
            setPlayerTwoName('Computer');
            setPlayerTwoChar(playerOneChar !== 'O' ? 'O' : 'X');

        }
        else {
            setPlayerTwoName('Player Two');
            setPlayerTwoChar(playerOneChar !== 'O' ? 'O' : 'X');
        }
    }, [vsAi]);


    return (
        <div className="Pannel container">

            <p>Tempo de jogo restante P1:</p>
            <div className="info row">

                <div id='PlayerOneTimer' className={vsAi ? "col-md-12" : "col-sm-6 timer"}>
                    <p>{!vsAi && "P1:"}</p>
                    <p>{timer1}</p>
                </div>

                {!vsAi && <div id='PlayerTwoTimer' className="col-sm-6 timer">
                    <p>P2:</p>
                    <p>{timer2}</p>
                </div>}
            </div>

            <button type="button" id="btPlay" onClick={onGameStart} >
                {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
            </button>
            <div className="playerSetup">
                <div id='gamemodes'>
                    <div id="opponent">
                        <input type='checkbox' disabled={gameStarted} id="vsAi" name="vsAi" onClick={(e) => setVsAi(e.target.checked)} />
                        <label htmlFor="vsAi">Play against computer?</label>
                    </div>
                    <div id="move-limitation">
                        <input type='checkbox' disabled={gameStarted} id="gamemode" name="gamemode" onClick={(e) => setGamemode(e.target.checked)} />
                        <label htmlFor="gamemode">Restricted Gamemode?</label></div>
                </div>

                <div id='PlayerOneSetup'>
                    <label className="P1" htmlFor="PlayerOneName">Player one</label>
                    <input type="text" id="PlayerOneName" name="PlayerOneName" defaultValue="Player One" onChange={(e) => setPlayerOneName(e.target.value)} />
                    <label className={`P1`} htmlFor="PlayerOneChar">Player one char: </label>
                    <input type="text" disabled={gameStarted} className='playerchar' id="PlayerOneChar" name="PlayerOneChar" defaultValue="X" maxLength={1} onChange={(e) => {
                        if (e.target.value !== playerTwoChar) { setPlayerOneChar(e.target.value); }
                        else {
                            alert("Cannot use the same symbol for both players");
                            e.target.value = playerOneChar;
                        }
                    }} />
                </div>
                {!vsAi && <div id='PlayerTwoSetup'>
                    <label className="P2" htmlFor="PlayerTwoName">Player two</label>
                    <input disabled={vsAi} type="text" id="PlayerTwoName" name="PlayerTwoName" defaultValue="Player Two" onChange={(e) => setPlayerTwoName(e.target.value)} />
                    <label className="P2" htmlFor="PlayerTwoChar">Player two char: </label>
                    <input disabled={gameStarted} type="text" className='playerchar' id="PlayerTwoChar" name="PlayerTwoChar" defaultValue="O" maxLength={1} onChange={(e) => {
                        if (e.target.value !== playerOneChar) { setPlayerTwoChar(e.target.value); }
                        else {
                            alert("Cannot use the same symbol for both players");
                            e.target.value = playerTwoChar;
                        }
                    }} />
                </div>}
                {vsAi && <div id='VersusComputerSetup'>
                    <label className="P2" htmlFor="Computer">Player two</label>
                    <input disabled="true" type="text" id="PlayerTwoName" name="PlayerTwoName" defaultValue="Computer" onChange={(e) => setPlayerTwoName(e.target.value)} />
                    <label className="P2" htmlFor="PlayerTwoChar">Player two char: </label>
                    <input disabled="true" type="text" className='playerchar' id="PlayerTwoChar" name="PlayerTwoChar" defaultValue={playerOneChar !== 'O' ? 'O' : 'X'} maxLength={1} />
                </div>}
            </div>

        </div>
    );
}

export default ControlPannel;

import { useState, useEffect } from 'react';
import './ControlPannel.css';

function ControlPannel({ gameStarted, onGameStart, timer, vsAi, setVsAi, gamemode, setGamemode }) {
    
    const [playerOneName, setPlayerOneName] = useState("Player");
    const [playerTwoName, setPlayerTwoName] = useState("Computer");

    useEffect(() => {
        console.log("vsAi = " + vsAi);

        console.log("playerOneName = " + playerOneName);
        console.log("playerTwoName = " + playerTwoName);
        if (vsAi) {
            document.getElementById("PlayerTwoName").style.backgroundColor = "#CCCCCC";
        }
        else {
            setPlayerTwoName("Computer");
            document.getElementById("PlayerTwoName").value = playerTwoName;
            document.getElementById("PlayerTwoName").style.backgroundColor = "#FFFFFF";
        }
    }, [vsAi]);



    return (
        <div className="Pannel">
            <p>Test Pannel</p>

            <div className="info"><p>Tempo de turno restante:</p><p>{timer}</p></div>

            <button type="button" id="btPlay" onClick={onGameStart} >
                {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
            </button>
            <div className="playerSetup">
                <label htmlFor="PlayerOneName">Player one</label>
                <input type="text" id="PlayerOneName" name="PlayerOneName" onChange={(e) => setPlayerOneName(e.target.value)} />
                <br />
                <br />
                <input type='checkbox' disabled={gameStarted} id="vsAi" name="vsAi" onClick={(e) => setVsAi(e.target.checked)} />
                <label htmlFor="vsAi">Play against computer?</label>
                <br />
                <br />
                <input type='checkbox'  disabled={gameStarted} id="gamemode" name="gamemode" onClick={(e) => setGamemode(e.target.checked)} />
                <label htmlFor="gamemode">Restricted Gamemode?</label>
                <br />
                <br />
                <label htmlFor="PlayerTwoName">Player two</label>
                <input disabled={vsAi} type="text" id="PlayerTwoName" name="PlayerTwoName" defaultValue={playerTwoName} onChange={(e) => setPlayerTwoName(e.target.value)} />
            </div>

        </div>
    );
}

export default ControlPannel;

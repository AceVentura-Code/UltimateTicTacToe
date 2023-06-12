import { useState, useEffect } from 'react';
import './ControlPannel.css';

function ControlPannel({ gameStarted, onGameStart, timer1, timer2, vsAi, setVsAi, setGamemode, setPlayerOneChar, setPlayerTwoChar, setPlayerOneName,setPlayerTwoName}) {
 
    

    useEffect(() => {
      

        if (vsAi) {
            setPlayerTwoName('Computer');
            setPlayerTwoChar('O');
            document.getElementById("PlayerTwoName").value = 'Computer';
            document.getElementById("PlayerTwoChar").value = 'O';
            document.getElementById("PlayerTwoName").style.backgroundColor = "#CCCCCC";
            document.getElementById("PlayerTwoChar").style.backgroundColor = "#CCCCCC";
        }
        else {
            setPlayerTwoName('Player Two');
            setPlayerTwoChar('O');
            document.getElementById("PlayerTwoName").value = 'Player Two';
            document.getElementById("PlayerTwoChar").value = 'O';
            document.getElementById("PlayerTwoName").style.backgroundColor = "#FFFFFF";
            document.getElementById("PlayerTwoChar").style.backgroundColor = "#FFFFFF";
        }
    }, [vsAi]);
    


    return (
        <div className="Pannel">
            <p>Test Pannel</p>

            <div className="info">
                
                <p>Tempo de jogo restante P1:</p>
                <p>{timer1}</p>

                {!vsAi && <p>Tempo de jogo restante P2:</p>}
                {!vsAi && <p>${timer2}</p>}
            </div>

            <button type="button" id="btPlay" onClick={onGameStart} >
                {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
            </button>
            <div className="playerSetup">
                <label className="P1" htmlFor="PlayerOneName">Player one</label>
                <input type="text" id="PlayerOneName" name="PlayerOneName" defaultValue="Player One" onChange={(e) => setPlayerOneName(e.target.value)} />
                <label className="P1" htmlFor="PlayerOneChar">Player one char: </label> 
                <input type="text" className='playerchar' id="PlayerOneChar" name="PlayerOneChar"defaultValue="X" maxLength={1} onChange={(e) => setPlayerOneChar(e.target.value)}/>
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
                <label className="P2" htmlFor="PlayerTwoName">Player two</label>
                <input disabled={vsAi} type="text" id="PlayerTwoName" name="PlayerTwoName" defaultValue="Player Two" onChange={(e) => setPlayerTwoName(e.target.value)} />
                <label className="P2"htmlFor="PlayerTwoChar">Player two char: </label> 
                <input disabled={vsAi} type="text" className='playerchar' id="PlayerTwoChar" name="PlayerTwoChar" defaultValue="O" maxLength={1} onChange={(e) => setPlayerTwoChar(e.target.value)}
 />
            </div>

        </div>
    );
}

export default ControlPannel;

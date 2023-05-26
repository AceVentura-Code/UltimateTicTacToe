import './ControlPannel.css';

function ControlPannel({gameStarted, onGameStart, timer}) {
    return (
        <div className="Pannel">
            <p>Test Pannel</p>

            <div className="info"><p>Tempo de turno restante:</p><p>{timer}</p></div>

            <button btype="button" bid="btPlay" onClick={onGameStart} b>
                {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
            </button>
        </div>
    );
}

export default ControlPannel;

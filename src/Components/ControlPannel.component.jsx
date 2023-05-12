import './ControlPannel.css';

function ControlPannel({gameStarted, onGameStart, timer}) {
    return (
        <div className="Pannel">
            <p>Test Pannel</p>
            <button btype="button" bid="btPlay" onClick={onGameStart} b>
                {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
            </button>
        </div>
    );
}

export default ControlPannel;

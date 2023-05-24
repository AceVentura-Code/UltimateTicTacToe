import './SubGame.css';
import GameCell from './Cell.component';

function SubGame({key, GameStatus, player ,onPlayerMove}) {

    const minorGames = Array(9).fill(0)
    return (
        <div className='col-md-4'>
            <div className='container subgame'>
                <div className="row">
                    {minorGames.map((item, index) => (
                        <GameCell  key={index} player={player} cell={item} onPlayerMove={onPlayerMove} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubGame;

import './SubGame.css';
import GameCell from './Cell.component';

function SubGame({ GameStatus }) {

    const minorGames = Array(9).fill(0)
    return (
        <div className='col-md-4'>
            <div className='container subgame'>
                <div className="row">
                    {minorGames.map((item) => (
                        <GameCell />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubGame;

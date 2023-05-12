import './Cell.css';

function GameCell({ player }) {

    return (
        <div className='col-md-4'>
            <div className='cell'>
                <p>X</p>
            </div>
        </div>
    );
}

export default GameCell;

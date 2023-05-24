import './Cell.css';

function GameCell({key, player, cell, onPlayerMove }) {

    const onClick = () =>{

    }



    return (
        <div className='col-md-4'>
            <div className='cell'  onClick={e => { cell=player; onPlayerMove(); console.log(cell);}} >
                {/* {condition && <jsx> you wanted to render <jsx/>} */}
                {/* <p>X</p> */}
                <p>{cell === 1 ? 'x' : cell === -1 ? 'O' :  " "}</p>
            </div>
        </div>
    );
}

export default GameCell;

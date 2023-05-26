import './Cell.css';

function GameCell({key, player, cell, onPlayerMove }) {

    const onClick = () =>{

    }
    let text = cell === 1 ? 'x' : cell === -1 ? 'O' :  " "


    return (
        <div className='col-md-4'>
            <div className='cell'  onClick={e => { cell=player; onPlayerMove(); console.log(cell);}} >
                {/* {condition && <jsx> you wanted to render <jsx/>} */}
                {/* <p>X</p> */}
                <button className='btn'>X</button>
                {/* <p>{text}</p> */}
            </div>
        </div>
    );
}

export default GameCell;

import './Cell.css';
import { playerOne, playerTwo } from '../Constants';

function GameCell({ key, cell, player }) {

    // let wasPressed = false;
    // let content = ' ';
    // const onCellClick = () => {
    //     if (player === 1) { content = playerOne }
    //     else if (player === -1) { content = playerTwo }
    //     console.log("cell = " + key);
    //     console.log("content = " + content);
    // }
    let text = cell === 1 ? playerOne : cell === -1 ? playerTwo : " "


    return (
        <div className='cell' >
            {/* {condition && <jsx> you wanted to render <jsx/>} disabled={cell!==0} onClick={e => { cell = player; onPlayerMove(); console.log("cell "+ cell);}}*/}
            {/* <p>X</p> */}
            <button className='btn btn-primary btn-lg cellBtn'>{text}</button>
            {/* <p>{text}</p> */}
        </div>
    );
}

export default GameCell;

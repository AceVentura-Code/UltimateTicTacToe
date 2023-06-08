import './SubGame.css';
import GameCell from './Cell.component';
import { useState, useEffect } from 'react';

function SubGame({ indexOut, gameStarted, player, onPlayerMove, isAvailable, onBoardMove , onWinFunc,majorGamesIndex}) {

    const [minorGames, setMinorGames] = useState(Array(9).fill(0));
    const [colorSwap, setColorSwap] = useState("blue-color");
    const [isComplete, setIsComplete] = useState(false);
    const [gameEnd, setGameEnd] = useState(0);

    useEffect(() => {
        if(minorGames.filter(x => x==0).length == 0){
            setIsComplete(true);
        }
    }, [minorGames]);

    useEffect(() => {
        if (gameStarted) {
            setMinorGames(Array(9).fill(0));
            setGameEnd(0);
            setColorSwap("btn-primary");
        }
    }, [gameStarted]);

    const onCellClick = (index) => {
        console.log("GameStatus" + gameStarted);
        
        if (!gameStarted || !isAvailable || minorGames[index] !== 0 || gameEnd == 1 ) { return; }
        minorGames[index] = player;
    
        onPlayerMove()
        onBoardMove(index, indexOut, (minorGames.filter(x => x == 0).length == 0));

        //Verificar se alguem ganhou e dar update as cores
        //Verificar Coluna
        let colVerification = verifyCols(minorGames, index);
        //Verificar Linha
        let rowVerification =  verifyRows(minorGames, index);
        //Verificar Diagonal
        let diagVerification = verifyDiag(minorGames, index);   
        
        if(colVerification != 0 || rowVerification != 0 || diagVerification != 0){
            if(minorGames[index] == 1){
                setColorSwap("green-color");
                onWinFunc(majorGamesIndex, 1);
            }
            else{
                setColorSwap("red-color");
                onWinFunc(majorGamesIndex, -1);
            }
            setGameEnd(1);
            
            return;
        }      
        if(minorGames.filter(x => x==0).length === 0){
            setColorSwap("yellow-color");
            onWinFunc(majorGamesIndex, 0)
            setGameEnd (1);
        }
    }

    //Retornar vencedor da coluna, se nao houver, retorna 0
    function verifyCols(minorGames, index){
        if(minorGames[index] == minorGames[(index+3) % 9] && minorGames[(index+3) % 9] == minorGames[(index + 6) % 9]){
            return(minorGames[index]);
        } 
        return 0;
    }

    function verifyRows(minorGames, index){
        let rowNumber = Math.floor(index/3); //numero a dividir por 3 arredondado para baixo
        let startIndex = rowNumber*3;
        if(minorGames[startIndex] == minorGames[startIndex+1] && minorGames[startIndex+1] == minorGames[startIndex + 2]){
            return(minorGames[index]);
        } 
        return 0;
    }

    function verifyDiag(minorGames, index){
        if(index % 2 != 0 ){
            return 0;
        }
        if(minorGames[4] == 0){
            return 0;
        }
        if(minorGames[0]==minorGames[4] && minorGames[8]==minorGames[4]){
            return(minorGames[index])
        }
        if(minorGames[2]==minorGames[4] && minorGames[6]==minorGames[4]){
            return(minorGames[index])
        }
        return 0;
    }

    return (
        <div className='col-md-4'>
            <div className={`container subgame ${isAvailable ? 'selectable-board' : ''}`}>
                <div className="row">
                    {minorGames.map((item, index) => (
                        <div key={index.toString() + "of" + indexOut.toString()} className='col-md-4' onClick={e => { onCellClick(index); }}>
                            <GameCell cell={item} colorSwap={colorSwap} isAvailable={isAvailable} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubGame;

import { useState, useEffect } from 'react';
import './GameBoard.css';
import SubGame from './SubGame.component';

function GameBoard({ player, onPlayerMove, gameStarted, onGameStart }) {
    const [subGameStatus, setSubGameStatus] = useState(false);
    const [majorGames, setMajorGames] = useState(Array(9).fill(0));

    //Use -1 to allow any or a number [0, 8] to restrict by index
    const [nextBoard, setNextBoard] = useState(-1);

    const onBoardMove = (indexMove, index, isComplete) => {
        if (isComplete) { setNextBoard(-1); }
        else { setNextBoard(indexMove); }
    }

    useEffect(() => {
        if (gameStarted) {
            setSubGameStatus(gameStarted);
            setMajorGames(Array(9).fill(0));
        }
    }, [gameStarted]);

    const OnSubGamedWin = (majorGamesIndex, winner) => {
        console.log("O vencedor do tabuleiro " + majorGamesIndex + " foi o " + winner);
        majorGames[majorGamesIndex] = winner;


        //Verificar se alguem ganhou e dar update as cores
        //Verificar Coluna
        let colVerification = verifyCols(majorGamesIndex);
        //Verificar Linha
        let rowVerification =  verifyRows(majorGamesIndex);
        //Verificar Diagonal
        let diagVerification = verifyDiag(majorGamesIndex);   
        

        //ganhar diretamente
        if(colVerification != 0 || rowVerification != 0 || diagVerification != 0 ){
            if(majorGames[majorGamesIndex] == 1){
                console.log("O X Ganhou o tabuleiro Completo")
            }
            else{
                console.log("A O Ganhou o tabuleiro Completo")
            }
            
            return;
        }      
        if(majorGames.filter(x => x==0).length === 0){
            console.log("Acabou em empate")
        }
    }

      //Retornar vencedor da coluna, se nao houver, retorna 0
    function verifyCols(index){
        if(majorGames[index] == majorGames[(index+3) % 9] && majorGames[(index+3) % 9] == majorGames[(index + 6) % 9]){
            return(majorGames[index]);
        } 
        return 0;
    }

    function verifyRows(index){
        let rowNumber = Math.floor(index/3); //numero a dividir por 3 arredondado para baixo
        let startIndex = rowNumber*3;
        if(majorGames[startIndex] == majorGames[startIndex+1] && majorGames[startIndex+1] == majorGames[startIndex + 2]){
            return(majorGames[index]);
        } 
        return 0;
    }

    function verifyDiag(index){
        if(index % 2 != 0 ){
            return 0;
        }
        if(majorGames[4] == 0){
            return 0;
        }
        if(majorGames[0]==majorGames[4] && majorGames[8]==majorGames[4]){
            return(majorGames[index])
        }
        if(majorGames[2]==majorGames[4] && majorGames[6]==majorGames[4]){
            return(majorGames[index])
        }
        return 0;
    }


    return (
        <div className="container board">
            <p>Test Board</p>
            <div className="row">
                {majorGames.map((item, index) => (
                    <SubGame key={index.toString()} indexOut={index} gameStarted={gameStarted} player={player} onPlayerMove={onPlayerMove} isAvailable={nextBoard === -1 || nextBoard === index} onBoardMove={onBoardMove}  onWinFunc={OnSubGamedWin} majorGamesIndex={index} />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;

import { useState, useEffect } from "react";
import "./GameBoard.css";
import SubGame from "./SubGame.component";

function GameBoard({
  player,
  onPlayerMove,
  gameStarted,
  gamemode,
  vsAi,
}) {
  const [majorGames, setMajorGames] = useState(Array(9).fill(null));
  const [writeFunctions, setWriteFunctions] = useState(Array(9).fill(null))
  //Use -1 to allow any or a number [0, 8] to restrict by index
  const [nextBoard, setNextBoard] = useState(-1);
  const [computerToPlay, setComputerToPlay] = useState(false);
  const [finish, setFinish] = useState(false);

  const onBoardMove = (indexCell) => {
    if (gamemode && majorGames[indexCell] == null) {
      setNextBoard(indexCell);
      return indexCell;
    }
    setNextBoard(-1);
    return -1;
  };

  useEffect(() => {
    if (gameStarted) {
      setMajorGames(Array(9).fill(null));
      setNextBoard(-1);
      setComputerToPlay(false);
      setFinish(false);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (vsAi && computerToPlay && !finish) {
      var subGameIndex = nextBoard;
      if (nextBoard === -1) {
        const nullIndexes = majorGames.reduce((indexes, element, index) => {
          if (element === null) {
            indexes.push(index);
          }
          return indexes;
        }, []);
    
        if (nullIndexes.length > 0) {
          const randomIndex = Math.floor(Math.random() * nullIndexes.length);
          subGameIndex = nullIndexes[randomIndex];
        }
      }
      console.log(subGameIndex);
      

      while(true){
        var randomIndex = Math.floor(Math.random() * 9);
        if(writeFunctions[subGameIndex](randomIndex)){
          break;
        }
      }
      onBoardMove(subGameIndex);
      setComputerToPlay(false);
    }
    
  }, [computerToPlay]);

  const OnSubGamedWin = (majorGamesIndex, winner) => {
    console.log(
      "O vencedor do tabuleiro " + majorGamesIndex + " foi o " + winner
    );
    majorGames[majorGamesIndex] = winner;

    console.log(majorGames)
    //Verificar se alguem ganhou e dar update as cores
    //Verificar Coluna
    let colVerification = verifyCols(majorGamesIndex);
    //Verificar Linha
    let rowVerification = verifyRows(majorGamesIndex);
    //Verificar Diagonal
    let diagVerification = verifyDiag(majorGamesIndex);

    //ganhar diretamente
    if (colVerification != 0 || rowVerification != 0 || diagVerification != 0) {

      if (majorGames[majorGamesIndex] == 1) {
        alert("O X Ganhou o tabuleiro Completo");
        
      } else {
        alert("A O Ganhou o tabuleiro Completo");
      }
      setFinish(true);
      return;
    }
    else if (majorGames.filter((x) => x == null).length === 0) {
      alert("Acabou em empate");
      setFinish(true);
    }
   
  };

  //Retornar vencedor da coluna, se nao houver, retorna 0
  function verifyCols(index) {
    if (
      majorGames[index] == majorGames[(index + 3) % 9] &&
      majorGames[(index + 3) % 9] == majorGames[(index + 6) % 9]
    ) {
      return majorGames[index];
    }
    return 0;
  }

  function verifyRows(index) {
    let rowNumber = Math.floor(index / 3); //numero a dividir por 3 arredondado para baixo
    let startIndex = rowNumber * 3;
    if (
      majorGames[startIndex] == majorGames[startIndex + 1] &&
      majorGames[startIndex + 1] == majorGames[startIndex + 2]
    ) {
      return majorGames[index];
    }
    return 0;
  }

  function verifyDiag(index) {
    if (index % 2 != 0) {
      return 0;
    }
    if (majorGames[4] == null) {
      return 0;
    }
    if (majorGames[0] == majorGames[4] && majorGames[8] == majorGames[4]) {
      return majorGames[index];
    }
    if (majorGames[2] == majorGames[4] && majorGames[6] == majorGames[4]) {
      return majorGames[index];
    }
    return 0;
  }


  return (
    <div className="container board">
      <p>Test Board</p>
      <div className="row">
        {majorGames.map((item, index) => (
          <SubGame
          
            key={index.toString()}
            indexOut={index}
            gameStarted={gameStarted}
            player={player}
            onPlayerMove={onPlayerMove}
            isAvailable={nextBoard === -1 || nextBoard === index}
            onBoardMove={onBoardMove}
            onWinFunc={OnSubGamedWin}
            majorGamesIndex={index}
            vsAi={vsAi}
            setComputerToPlay={setComputerToPlay}
            writeFunction={writeFunctions}
            gameFinished={finish}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;

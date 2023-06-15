import { useState, useEffect } from "react";
import "./GameBoard.css";
import SubGame from "./SubGame.component";
function GameBoard({
    player,
    onPlayerMove,
    gameStarted,
    setGameStarted,
    gamemode,
    vsAi,
    playerOneChar,
    playerTwoChar,
    playerOneName,
    playerTwoName
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
            if (player === -1 && vsAi) {
                setComputerToPlay(true);
            }
        }
        else {
            setComputerToPlay(false);

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
            while (true) {
                var randomIndex = Math.floor(Math.random() * 9);
                if (writeFunctions[subGameIndex](randomIndex)) {
                    break;
                }
            }
            onBoardMove(randomIndex);
            setComputerToPlay(false);
        }

    }, [computerToPlay]);

    const OnSubGamedWin = (majorGamesIndex, winner) => {

        if (winner === 1) {
            alert("O vencedor do tabuleiro " + (majorGamesIndex  + 1) + " foi o \"" + playerOneName + "\"")
        } else if (winner === -1) {
            alert("O vencedor do tabuleiro " + (majorGamesIndex + 1) + " foi o \"" + playerTwoName + "\"")
        } else {
            alert("O tabuleiro " + (majorGamesIndex + 1) + " acabou em empate")
        }
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
                alert("O jogador \"" + playerOneName + "\" Ganhou o tabuleiro Completo");

            } else {
                alert("O jogador \"" + playerTwoName + "\" Ganhou o tabuleiro Completo");
            }
            setFinish(true);
            
            setGameStarted(false);

            return;
        }
        else if (majorGames.filter((x) => x == null).length === 0) {
            var P1Wins = majorGames.filter((x) => x == 1).length;
            var P2Wins = majorGames.filter((x) => x == -1).length;
            if (P1Wins > P2Wins) {
                alert("O jogador \"" + playerOneName + "\" Ganhou o tabuleiro Completo");
            }
            else if (P1Wins < P2Wins) {
                alert("O jogador \"" + playerTwoName + "\" Ganhou o tabuleiro Completo");
            }
            else {
                alert("Acabou em empate");
            }
            setFinish(true);

            setGameStarted(false);

            if (player === 1) {
                alert("O jogador \"" + playerTwoName + "\" Ganhou o tabuleiro Completo");
            }
            else if (player === -1) {
                alert("O jogador \"" + playerOneName + "\" Ganhou o tabuleiro Completo");
            }
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
                        playerOneChar={playerOneChar}
                        playerTwoChar={playerTwoChar}

                    />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;

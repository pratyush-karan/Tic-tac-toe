"use client";
import React, { useEffect, useState } from "react";
import "./optimized.scss";

const OptimizedPage = () => {
  const initialValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [game, setGame] = useState(initialValues);
  const [player, setPlayer] = useState(1);
  const [gameStatus, setGameStatus] = useState({
    gameOver: false,
    playerWon: false,
  });
  const [chancesPlayed, setChancesPlayed] = useState([]);

  const handleSelect = (e, i) => {
    if (!game[i]) {
      const copy = [...game];
      copy[i] = player === 1 ? "X" : "O";
      setGame(copy);
      let chances = [...chancesPlayed];
      chances.push(i);
      setChancesPlayed(chances);
    }
  };

  const checkIfPlayerWon = () => {
    //for horizhontal
    let combi;
    for (let i = 0; i <= 6; i = i + 3) {
      combi = `${game[i]}${game[i + 1]}${game[i + 2]}`;
      if (combi === "XXX" || combi === "OOO") return true;
    }

    //for vertical
    for (let i = 0; i <= 2; i++) {
      combi = `${game[i]}${game[i + 3]}${game[i + 6]}`;
      if (combi === "XXX" || combi === "OOO") return true;
    }

    //for diagonal
    combi = `${game[0]}${game[4]}${game[8]}`;
    if (combi === "XXX" || combi === "OOO") return true;
    combi = `${game[2]}${game[4]}${game[6]}`;
    if (combi === "XXX" || combi === "OOO") return true;
    return false;
  };

  const checkDisabled = (e) => {
    if (e) return true;
    else return false;
  };

  useEffect(() => {
    if (chancesPlayed.length) {
      console.log(checkIfPlayerWon());
      //   if (checkIfPlayerWon()) {
      //     setGameStatus((prev) => {
      //       prev.gameOver = true;
      //       prev.playerWon = true;
      //       return prev;
      //     });
      //   } else {
      //     setPlayer((prev) => (prev === 1 ? 2 : 1));
      //   }
    }
  }, [chancesPlayed]);

  return (
    <>
      {/* {console.log(game)} */}
      {console.log(chancesPlayed)}
      <div className="game-container">
        {game.map((e, i) => (
          <div className="box" key={i}>
            <button
              className="btn"
              onClick={() => handleSelect(e, i)}
              disabled={checkDisabled(e)}
            >
              {!!game[i] && game[i]}
            </button>
          </div>
        ))}
      </div>
      {gameStatus.gameOver && (
        <div>
          {gameStatus.playerWon ? `Player ${player} Won` : `Game is Draw`}
        </div>
      )}
    </>
  );
};

export default OptimizedPage;

"use client";
import React, { useEffect, useState } from "react";
import "./optimized.scss";

const OptimizedPage = () => {
  const initialValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [game, setGame] = useState(initialValues);
  const [player, setPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [draw, setDraw] = useState(false);
  const [chancesPlayed, setChancesPlayed] = useState(0);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const handleSelect = (e, i) => {
    if (!game[i]) {
      const copy = [...game];
      copy[i] = player === 1 ? "X" : "O";
      setGame(copy);
      let chances = chancesPlayed ? [...chancesPlayed] : [];
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
    if (e || gameOver) return true;
    else return false;
  };

  useEffect(() => {
    if (!!chancesPlayed.length) {
      if (checkIfPlayerWon()) {
        setScores((prev) => {
          prev[`player${player}`]++;
          return prev;
        });
        setGameOver(true);
      } else {
        if (chancesPlayed?.length === 9) {
          setGameOver(true);
          setDraw(true);
        } else {
          setPlayer((prev) => (prev === 1 ? 2 : 1));
        }
      }
    }
  }, [game]);

  const handleStartAgain = () => {
    setGame(initialValues);
    setGameOver(false);
    setDraw(false);
    setChancesPlayed(0);
    setPlayer(1);
  };

  const handleRedo = () => {
    const copy = [...game];
    const copyChances = chancesPlayed;
    copy[copyChances.pop()] = 0;
    setChancesPlayed(copyChances);
    // copy[chancesPlayed.pop()] = 0;
    setGame(copy);
  };

  return (
    <>
      <div className="game-container">
        <div className="scores">Player 1 Score : {scores.player1}</div>
        <div className="game">
          {game.map((e, i) => (
            <div className="box" key={i}>
              <button
                className="btn-game"
                onClick={() => handleSelect(e, i)}
                disabled={checkDisabled(e)}
              >
                {!!game[i] && game[i]}
              </button>
            </div>
          ))}
        </div>

        <div className="scores">Player 2 Score : {scores.player2}</div>
      </div>
      {gameOver && (
        <div className="game-result">
          {!draw ? `Player ${player} Won` : `Game is Draw`}
        </div>
      )}
      <div className="options">
        <div>
          <button
            className="btn-options"
            onClick={handleRedo}
            disabled={gameOver}
          >
            Redo
          </button>
        </div>
        <div>
          <button
            className="btn-options"
            onClick={handleStartAgain}
            disabled={!gameOver}
          >
            Go Again
          </button>
        </div>
      </div>
    </>
  );
};

export default OptimizedPage;

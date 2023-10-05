"use client";
import "./landingPage.scss";
import { useState } from "react";

export default function Home() {
  const initialValues = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const [game, setGame] = useState(initialValues);
  const [player, setPlayer] = useState(1);
  const [gameDisable, setGameDisable] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const handleSelect = (r, c) => {
    const copy = [...game];
    if (copy[r][c] === 0) {
      copy[r][c] = player;
      setGame(copy);
      checkPlayerWon().then(() => setPlayer((prev) => (prev === 1 ? 2 : 1)));
    } else {
      alert("Already Selected");
    }
  };

  const displayItem = (value) => {
    switch (value) {
      case 1:
        return "X";
      case 2:
        return "O";
      default:
        return "";
    }
  };

  const checkPlayerWon = () => {
    return new Promise((resolve, reject) => {
      //checkhorizhontal condition
      for (let i = 0; i <= 2; i++) {
        if (
          game[i][0] === game[i][1] &&
          game[i][1] === game[i][2] &&
          game[i][0] !== 0
        ) {
          let copy = { ...score };
          copy[`player${player}`]++;
          setScore(copy);
          setGameDisable(true);
          reject();
        }
      }

      //check vertical condition
      for (let i = 0; i <= 2; i++) {
        if (
          game[0][i] === game[1][i] &&
          game[1][i] === game[2][i] &&
          game[0][i] !== 0
        ) {
          let copy = { ...score };
          copy[`player${player}`]++;
          setScore(copy);
          setGameDisable(true);
          reject();
        }
      }

      //check diagonal condition
      if (
        game[0][0] === game[1][1] &&
        game[1][1] === game[2][2] &&
        game[0][0] !== 0
      ) {
        let copy = { ...score };
        copy[`player${player}`]++;
        setScore(copy);
        setGameDisable(true);
        reject();
      }
      if (
        game[0][2] === game[1][1] &&
        game[1][1] === game[2][0] &&
        game[0][2] !== 0
      ) {
        let copy = { ...score };
        copy[`player${player}`]++;
        setScore(copy);
        setGameDisable(true);
        reject();
      }

      resolve();
    });
  };

  const handleStartAgain = () => {
    setGame(initialValues);
    setPlayer(1);
    setGameDisable(false);
  };

  return (
    <>
      <div className="container">
        {gameDisable && <div className="float">Player {player} Won</div>}
        <div className="score">
          <span>Player1 Score:</span> {score.player1}
        </div>
        <div className="game">
          {Object.keys(initialValues).map((e1, r) => (
            <div key={e1} className="game-row">
              {Object.keys(initialValues).map((e2, c) => (
                <div key={e2}>
                  <button
                    className="btn-custom"
                    onClick={() => handleSelect(r, c)}
                    disabled={gameDisable}
                  >
                    {displayItem(game[r][c])}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="score">
          <span>Player2 Score:</span> {score.player2}
        </div>
      </div>
      {gameDisable && (
        <div className="another-round">
          <button onClick={handleStartAgain}>Go Another Round!</button>
        </div>
      )}
    </>
  );
}

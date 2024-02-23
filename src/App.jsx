/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css";

const SIZE = 3;

function getDefaultGrid() {
  let tempGrid = [];
  for (let r = 0; r < SIZE; ++r) {
    tempGrid.push([]);
    for (let c = 0; c < SIZE; ++c) {
      tempGrid[r].push({ r: r, c: c, value: "" });
    }
  }
  return tempGrid;
}

function Square({ row, column, value, cellClicked }) {
  return (
    <div className="square" onClick={() => cellClicked(row, column)}>
      <h1>{value}</h1>
    </div>
  );
}

function App() {
  const [grid, setGrid] = useState(getDefaultGrid());
  const [nextMove, setNextMove] = useState("X");
  const [winner, setWinner] = useState("");
  const [tie, setTie] = useState(false);

  const cellClicked = (row, column) => {
    if (grid[row][column].value) {
      console.log("Already filled");
      return;
    }
    setGrid((prevGrid) => {
      let newGrid = [...prevGrid];
      newGrid[row][column].value = nextMove;
      return newGrid;
    });
    setNextMove((prevMove) => (prevMove === "X" ? "O" : "X"));
  };

  const clearGrid = () => {
    setGrid(getDefaultGrid());
    setWinner("");
    setTie(false);
    setNextMove("X");
  };

  useEffect(() => {
    let newWinner = "";
    let countFilled = 0;
    for (let i = 0; i < SIZE; ++i) {
      for (let j = 0; j < SIZE; ++j) {
        countFilled += !!grid[i][j].value;
      }
      if (
        !newWinner &&
        grid[i][0].value === grid[i][1].value &&
        grid[i][0].value === grid[i][2].value
      ) {
        newWinner = grid[i][0].value;
      }
      if (
        !newWinner &&
        grid[0][i].value === grid[1][i].value &&
        grid[0][i].value === grid[2][i].value
      ) {
        newWinner = grid[0][i].value;
      }
    }
    if (
      !newWinner &&
      ((grid[0][0].value === grid[1][1].value &&
        grid[0][0].value === grid[2][2].value) ||
        (grid[0][2].value === grid[1][1].value &&
          grid[0][2].value === grid[2][0].value))
    ) {
      newWinner = grid[1][1].value;
    }
    if (countFilled === 9 && !newWinner) {
      setTie(true);
    }
    setWinner(newWinner);
  }, [grid]);

  return (
    <>
      {winner && <h2>Winner is: {winner}</h2>}
      {tie && <h2>It&apos;s a tie!</h2>}
      {(winner || tie) && (
        <button onClick={clearGrid} className="restart-btn">
          Restart?
        </button>
      )}
      <div className="board">
        {grid.map((row) => {
          return (
            <div className="row" key={Math.random()}>
              {row.map((cell) => {
                return (
                  <Square
                    key={Math.random()}
                    row={cell.r}
                    column={cell.c}
                    value={cell.value}
                    cellClicked={cellClicked}
                  ></Square>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;

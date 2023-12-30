import { Reducer, useEffect, useReducer, useState } from "react";
import GameOver from "./GameOver";

type MovementValues =
  | null
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight";

const gridSize = 17;

interface Snake {
  gameOver: boolean;
  grid: number[][];
  snakePos: number[][];
  foodPos: number[] | null;
  direction: MovementValues;
}

const initialSnake: Snake = {
  gameOver: false,
  grid: Array.from(Array(gridSize), () => Array(gridSize).fill(0)),
  snakePos: [
    [8, 8],
    [9, 8],
    [10, 8],
    [11, 8],
  ],
  foodPos: null,
  direction: null,
};

enum AvailableAction {
  UPDTAE_SNAKE = "UPDTAE_GRID",
  UPDATE_DIRECTION = "UPDATE_DIRECTION",
  SET_GAME_OVER = "SET_GAME_OVER",
  RESTART = "RESTART",
  UPDTAE_FOOD = "UPDATE_FOOD",
}

type SnakeAction =
  | { type: AvailableAction.UPDTAE_SNAKE; payload: Omit<Snake, "gameOver"> }
  | { type: AvailableAction.UPDATE_DIRECTION; payload: MovementValues }
  | { type: AvailableAction.SET_GAME_OVER; payload: boolean }
  | { type: AvailableAction.RESTART; payload: Snake }
  | { type: AvailableAction.UPDTAE_FOOD; payload: number[] };

const reducer: Reducer<Snake, SnakeAction> = (state, action) => {
  switch (action.type) {
    case AvailableAction.UPDTAE_SNAKE:
      return {
        ...state,
        grid: action.payload.grid,
        snakePos: action.payload.snakePos,
        direction: action.payload.direction,
      };
    case AvailableAction.UPDATE_DIRECTION:
      return {
        ...state,
        direction: action.payload,
      };
    case AvailableAction.UPDTAE_FOOD:
      return {
        ...state,
        foodPos: action.payload,
      };
    case AvailableAction.SET_GAME_OVER:
      return {
        ...state,
        gameOver: action.payload,
      };
    case AvailableAction.RESTART:
      return action.payload;
    default:
      return state;
  }
};

const Board: React.FC = () => {
  const [snake, dispatch] = useReducer(reducer, initialSnake);
  const [keyPressed, setKeyPressed] = useState(false);
  const [score, setScore] = useState(0);
  const { grid, snakePos, direction, gameOver, foodPos } = snake;
  const highScore = localStorage.getItem("highScore");

  useEffect(() => {
    let intervalId: number;
    if (!gameOver) intervalId = setInterval(() => update(), 200);
    if (!keyPressed) document.addEventListener("keyup", detectKeyDown);
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("keyup", detectKeyDown);
    };
  });

  const detectKeyDown = (e: any) => {
    if (
      (e.key == "ArrowUp" && direction != "ArrowDown") ||
      (e.key == "ArrowDown" && direction != "ArrowUp") ||
      (e.key == "ArrowRight" && direction != "ArrowLeft") ||
      (e.key == "ArrowLeft" && direction != "ArrowRight")
    ) {
      setKeyPressed(true);
      dispatch({ type: AvailableAction.UPDATE_DIRECTION, payload: e.key });
    }
  };

  const updateGrid = (newSnakePos: number[][]) => {
    let newGrid = Array.from(Array(gridSize), () => Array(gridSize).fill(0));
    newSnakePos.map((arr) => (newGrid[arr[0]][arr[1]] = 1));
    return newGrid;
  };

  const updateSnake = () => {
    let newSnake = JSON.parse(JSON.stringify(snakePos));
    for (let i = newSnake.length - 1; i > 0; i--) {
      newSnake[i] = [...newSnake[i - 1]];
    }
    if (direction == "ArrowUp") newSnake[0][0]--;
    else if (direction == "ArrowDown") newSnake[0][0]++;
    else if (direction == "ArrowLeft") newSnake[0][1]--;
    else if (direction == "ArrowRight") newSnake[0][1]++;

    if (checkGameOver(newSnake)) {
      setHighScore();
      return snakePos;
    }

    return newSnake;
  };

  const snakeOverlap = (newSnakePos: number[][]) => {
    let overlap = false;
    newSnakePos.forEach((value, idx) => {
      if (
        idx != 0 &&
        value[0] == newSnakePos[0][0] &&
        value[1] == newSnakePos[0][1]
      )
        overlap = true;
    });
    return overlap;
  };

  const checkGameOver = (newSnakePos: number[][]) => {
    if (
      newSnakePos[0][0] < 0 ||
      newSnakePos[0][0] > gridSize - 1 ||
      newSnakePos[0][1] < 0 ||
      newSnakePos[0][1] > gridSize - 1 ||
      snakeOverlap(newSnakePos)
    ) {
      dispatch({ type: AvailableAction.SET_GAME_OVER, payload: true });
      return true;
    }
    return false;
  };

  const setHighScore = () => {
    localStorage.setItem("highScore", score.toString());
  };

  const update = () => {
    let newSnakePos: number[][] = direction ? updateSnake() : snakePos;
    let newGrid: number[][] = grid;

    newGrid = updateGrid(newSnakePos);
    if (checkFoodCollision(newSnakePos)) {
      if (foodPos) {
        newSnakePos = addSnakeTail(newSnakePos);
        setScore(score + 1);
      }
      addSnakeFood(newGrid);
    }
    setKeyPressed(false);
    dispatch({
      type: AvailableAction.UPDTAE_SNAKE,
      payload: {
        grid: newGrid,
        snakePos: newSnakePos,
        direction: direction,
        foodPos: foodPos,
      },
    });
  };

  const checkFoodCollision = (newSnakePos: number[][]) => {
    if (
      !foodPos ||
      (newSnakePos[0][0] == foodPos[0] && newSnakePos[0][1] == foodPos[1])
    )
      return true;
    return false;
  };

  const addSnakeTail = (newSnakePos: number[][]) => {
    let tail = newSnakePos.length - 1;
    if (newSnakePos[tail][0] == newSnakePos[tail - 1][0]) {
      let diff = newSnakePos[tail][1] - newSnakePos[tail - 1][1];
      newSnakePos.push([newSnakePos[tail][0], newSnakePos[tail][1] + diff]);
    } else {
      let diff = newSnakePos[tail][0] - newSnakePos[tail - 1][0];
      newSnakePos.push([newSnakePos[tail][0] + diff, newSnakePos[tail][1]]);
    }
    return newSnakePos;
  };

  const addSnakeFood = (newGrid: number[][]) => {
    let availableGrid: number[][] = [];
    newGrid.forEach((row, rIdx) => {
      row.forEach((value, cIdx) => {
        if (value == 0) availableGrid.push([rIdx, cIdx]);
      });
    });
    const foodIndex = Math.floor(Math.random() * availableGrid.length);
    dispatch({
      type: AvailableAction.UPDTAE_FOOD,
      payload: availableGrid[foodIndex],
    });
  };

  const restart = () => {
    const newGrid: number[][] = Array.from(Array(gridSize), () =>
      Array(gridSize).fill(0)
    );
    const newSnakePos: number[][] = [
      [8, 8],
      [9, 8],
      [10, 8],
      [11, 8],
    ];
    dispatch({
      type: AvailableAction.RESTART,
      payload: {
        grid: newGrid,
        snakePos: newSnakePos,
        direction: null,
        gameOver: false,
        foodPos: null,
      },
    });
    setScore(0);
  };

  return (
    <div className="flex flex-col justify-center items-center relative w-full h-full">
      <div className="flex gap-4">
        <div className="flex relative border-2 mx-1 w-36 rounded">
          <div className="pl-4 py-1">Score:</div>
          <div className="absolute right-0 pr-4 py-1">{score}</div>
        </div>
        <div className="flex relative border-2 mx-1 w-36 rounded">
          <div className="pl-4 py-1">High Score:</div>
          <div className="absolute right-0 pr-4 py-1">
            {highScore != null && +highScore > score ? highScore : score}
          </div>
        </div>
      </div>
      <div className="bg-gray-300 p-7 mt-6">
        {grid.map((row, rIdx) => {
          return (
            <div key={rIdx} className="flex">
              {row.map((col, cIdx) => {
                return (
                  <div
                    key={10 * rIdx + cIdx}
                    className={`h-7 w-7 ${
                      grid[rIdx][cIdx] == 1
                        ? snakePos[0][0] == rIdx && snakePos[0][1] == cIdx
                          ? "bg-red-600"
                          : "bg-red-400"
                        : foodPos && foodPos[0] == rIdx && foodPos[1] == cIdx
                        ? "bg-blue-400"
                        : rIdx % 2 == 0
                        ? cIdx % 2 == 0
                          ? "bg-gray-100"
                          : "bg-gray-200"
                        : cIdx % 2 == 0
                        ? "bg-gray-200"
                        : "bg-gray-100"
                    }`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="absolute w-full h-full">
        {gameOver ? <GameOver restart={restart} /> : ""}
      </div>
    </div>
  );
};

export default Board;

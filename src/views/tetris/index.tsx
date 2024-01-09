import "./tetris.css";
import { selectShape } from "./shapes";
import { Reducer, useEffect, useReducer, useState } from "react";

const rows = 20;
const cols = 10;

interface TetrisBoard {
  grid: number[][];
  selectedShape: number[][];
  position: number[];
}

const initialShape: TetrisBoard = {
  grid: Array.from(Array(rows), () => Array(cols).fill(0)),
  selectedShape: selectShape(),
  position: [0, 4],
};

enum AvailableAction {
  UPDATE_BOARD = "UPDATE_BOARD",
  UPDATE_POSITION = "UPDATE_POSITION",
  UPDATE_SHAPE = "UPDATE_SHAPE",
}

type ShapeAction =
  | { type: AvailableAction.UPDATE_POSITION; payload: number[] }
  | { type: AvailableAction.UPDATE_SHAPE }
  | {
      type: AvailableAction.UPDATE_BOARD;
      payload: TetrisBoard;
    };

const reducer: Reducer<TetrisBoard, ShapeAction> = (
  state = initialShape,
  action
) => {
  switch (action.type) {
    case AvailableAction.UPDATE_POSITION:
      return {
        ...state,
        position: action.payload,
      };
    case AvailableAction.UPDATE_SHAPE:
      return {
        ...state,
        position: [0, 4],
        selectedShape: selectShape(),
      };
    case AvailableAction.UPDATE_BOARD:
      return {
        ...state,
        grid: action.payload.grid,
        position: action.payload.position,
        selectedShape: action.payload.selectedShape,
      };
    default:
      return state;
  }
};

const Tetris = () => {
  const [tetrisBoard, dispatch] = useReducer(reducer, initialShape);
  const { grid, selectedShape, position } = tetrisBoard;
  const [gameOver, setGameOver] = useState(false);

  let keyPressed: null | string = null;
  let speed = 600;

  useEffect(() => {
    let intervalId: number;
    if (!gameOver) intervalId = setInterval(() => update(), speed);
    document.addEventListener("keydown", detectKeyDown);
    return () => {
      document.removeEventListener("keydown", detectKeyDown);
      clearInterval(intervalId);
    };
  });

  const detectKeyDown = (e: any) => {
    if (
      e.key == "ArrowDown" ||
      e.key == "ArrowRight" ||
      e.key == "ArrowLeft" ||
      e.key == "ArrowUp"
    ) {
      keyPressed = e.key;
    }
  };

  const update = () => {
    let newShape = selectedShape;
    if (keyPressed == "ArrowUp") newShape = rotateShape();
    const newPosition: number[] = updatePosition(newShape);

    if (checkValidPosition(newPosition)) {
      const newGrid = updateShapeValues();
      dispatch({
        type: AvailableAction.UPDATE_BOARD,
        payload: {
          grid: newGrid,
          position: [0, 4],
          selectedShape: selectShape(),
        },
      });
      return;
    }
    if (checkGameOver()) return;
    let newGrid = checkLineClear();
    newGrid = updateGrid(newPosition, position, newShape, newGrid);
    dispatch({
      type: AvailableAction.UPDATE_BOARD,
      payload: {
        grid: newGrid,
        position: newPosition,
        selectedShape: newShape,
      },
    });
  };

  const checkLineClear = () => {
    let newGrid = grid.slice();
    for (let i = 0; i < rows; i++) {
      const b = newGrid[i].every((val) => val == -1);
      if (b) {
        for (let j = i; j > 0; j--) {
          newGrid[j] = [...newGrid[j - 1]];
        }
      }
    }
    return newGrid;
  };

  const checkGameOver = () => {
    for (let i = position[1]; i < position[1] + selectedShape[0].length; i++) {
      if (grid[1][i] == -1) {
        setGameOver(true);
        return true;
      }
    }
  };

  const updateShapeValues = () => {
    let newGrid = grid.slice();
    for (let i = 0; i < selectedShape.length; i++) {
      for (let j = 0; j < selectedShape[i].length; j++) {
        if (newGrid[position[0] + i][position[1] + j] == 1)
          newGrid[position[0] + i][position[1] + j] = -1;
      }
    }
    return newGrid;
  };

  const updatePosition = (selectedShape: number[][]) => {
    let newPosition = [...position];
    newPosition[0]++;
    if (!keyPressed) return newPosition;
    let rStart = newPosition[0];
    let cStart = newPosition[1];
    let rEnd = newPosition[0] + selectedShape.length - 1;
    let cEnd = newPosition[1] + selectedShape[0].length - 1;

    if (keyPressed == "ArrowLeft" && cStart > 0 && rEnd < rows) {
      let collision = false;
      for (let i = rStart; i <= rEnd; i++) {
        for (let j = cStart; j <= cEnd; j++)
          if (grid[i - 1][j] == 1 && grid[i][j - 1] == -1) collision = true;
      }
      if (!collision) newPosition[1] -= 1;
    } else if (keyPressed == "ArrowRight" && cEnd < cols - 1 && rEnd < rows) {
      let collision = false;
      for (let i = rStart; i <= rEnd; i++) {
        for (let j = cStart; j <= cEnd; j++)
          if (grid[i - 1][j] == 1 && grid[i][j + 1] == -1) collision = true;
      }
      if (!collision) newPosition[1] += 1;
    } else if (keyPressed == "ArrowDown" && rEnd < rows - 1) {
      let collision = false;
      for (let i = cStart; i <= cEnd; i++) {
        if (grid[rEnd + 1][i] == -1) collision = true;
      }
      if (!collision) newPosition[0]++;
    }
    return newPosition;
  };

  const rotateShape = () => {
    let r = selectedShape.length;
    let c = selectedShape[0].length;

    if (position[1] + r > cols) return selectedShape;
    let newShape: number[][] = Array.from(Array(c), () => Array(r));
    for (let i = 0; i < c; i++) {
      for (let j = r - 1; j >= 0; j--) {
        newShape[i][r - 1 - j] = selectedShape[j][i];
      }
    }
    return newShape;
  };

  const checkValidPosition = (newPosition: number[]) => {
    let rStart = newPosition[0];
    let cStart = newPosition[1];
    let rEnd = newPosition[0] + selectedShape.length - 1;
    let cEnd = newPosition[1] + selectedShape[0].length - 1;

    if (rEnd == rows) return true;
    for (let i = rStart; i <= rEnd; i++) {
      for (let j = cStart; j <= cEnd; j++) {
        if (grid[i][j] == -1 && grid[i - 1][j] == 1) return true;
      }
    }
    return false;
  };

  const updateGrid = (
    newPosition: number[],
    prevPosition: number[],
    newShape: number[][],
    newGrid: number[][]
  ) => {
    for (let i = 0; i < selectedShape.length; i++) {
      for (let j = 0; j < selectedShape[i].length; j++) {
        if (newGrid[prevPosition[0] + i][prevPosition[1] + j] == 1)
          newGrid[prevPosition[0] + i][prevPosition[1] + j] = 0;
      }
    }
    for (let i = 0; i < newShape.length; i++) {
      for (let j = 0; j < newShape[i].length; j++) {
        if (newShape[i][j] == 1)
          newGrid[newPosition[0] + i][newPosition[1] + j] = newShape[i][j];
      }
    }
    return newGrid;
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="flex flex-col z-10">
        {grid.map((row, rIdx) => (
          <div className="flex" key={rIdx}>
            {row.map((col, cIdx) => (
              <div
                className={`cell ${
                  col == 0
                    ? "bg-slate-800"
                    : col == 1
                    ? "bg-red-500"
                    : col == -1
                    ? " bg-slate-500"
                    : ""
                }`}
                key={10 * rIdx + cIdx}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute z-20">
        {gameOver ? (
          <div className="text-4xl text-red-200 font-bold">Game Over</div>
        ) : null}
      </div>
    </div>
  );
};

export default Tetris;

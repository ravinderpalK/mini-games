import Winner from "./Winner";
import { Reducer, useReducer, useState } from "react";
import "./tic-tac-toe.css";

type Status = "won" | "draw" | "loss" | "running";

export interface Game {
  over: boolean;
  status: Status;
  winner: boolean | null;
}
const initialGame: Game = {
  over: false,
  status: "running",
  winner: null,
};

enum AvailableAction {
  WON = "WON",
  DRAW = "DRAW",
  LOSS = "LOSS",
  RESTART = "RESTART",
}

type GameAction =
  | { type: AvailableAction.WON; payload: boolean }
  | { type: AvailableAction.DRAW }
  | { type: AvailableAction.LOSS; payload: boolean }
  | { type: AvailableAction.RESTART };

const reducer: Reducer<Game, GameAction> = (state, action) => {
  switch (action.type) {
    case AvailableAction.WON:
      return {
        ...state,
        over: true,
        status: "won",
        winner: action.payload,
      };
    case AvailableAction.DRAW:
      return {
        ...state,
        over: true,
        status: "draw",
      };
    case AvailableAction.LOSS:
      return {
        ...state,
        over: true,
        status: "loss",
        winner: action.payload,
      };
    case AvailableAction.RESTART:
      return {
        ...state,
        over: false,
        status: "running",
        winner: null,
      };
    default:
      return state;
  }
};

interface BoardProps {
  xScore: number;
  oScore: number;
  setXScore: (score: number) => void;
  setOScore: (score: number) => void;
}

const Board: React.FC<BoardProps> = (props) => {
  const [game, dispatch] = useReducer(reducer, initialGame);
  let [player, setPlayer] = useState(true);
  let [grid, setGrid] = useState(Array(9).fill(-1));

  const { setXScore, setOScore, xScore, oScore } = props;

  const win = (player: boolean) => {
    dispatch({ type: AvailableAction.WON, payload: player });
    if (player) setXScore(xScore + 1);
    else setOScore(oScore + 1);
  };

  let checkWin = (player: boolean, id: number) => {
    //for row
    let r = Math.floor(id / 3);
    for (let i = r * 3; i < r * 3 + 3; i++) {
      if (grid[i] != player) {
        break;
      }
      if (i == r * 3 + 2) win(player);
    }

    //for col
    let c = id > 2 ? (id - 3 > 2 ? id - 6 : id - 3) : id;
    for (let i = c; i < 9; i = i + 3) {
      if (grid[i] != player) break;
      if (i == c + 6) win(player);
    }

    // for diagonals
    if (id % 2 != 0) return;
    else if (grid[0] == player && grid[4] == player && grid[8] == player)
      win(player);
    else if (grid[2] == player && grid[4] == player && grid[6] == player)
      win(player);
  };

  const checkDraw = () => {
    for (let i of grid) {
      if (i == -1) return;
    }
    dispatch({ type: AvailableAction.DRAW });
  };

  const update = (id: number) => {
    if (grid[id] != -1) return;

    let newGrid = grid;
    newGrid[id] = +player;
    setGrid(newGrid);
    setPlayer(!player);

    checkWin(player, id);
    checkDraw();
  };
  console.log(grid);

  const restart = () => {
    setGrid(Array(9).fill(-1));
    setPlayer(true);
    dispatch({ type: AvailableAction.RESTART });
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-full w-full">
      <div>
        {game.over ? (
          <Winner game={game} />
        ) : (
          <div className="grid grid-cols-3 gap-1 bg-gray-900 justify-center content-center items-center justify-items-center ">
            {grid.map((value, idx) => (
              <div
                key={idx}
                onClick={() => update(idx)}
                className={`cell bg-white ${value == 1 ? " x" : ""} ${
                  value == 0 ? " o" : ""
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-20">
        <button onClick={restart} className="px-6 py-1 border-2 rounded-md">
          Restart
        </button>
      </div>
    </div>
  );
};

export default Board;

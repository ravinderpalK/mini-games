import { Game } from "./Board";
import "./tic-tac-toe.css";

interface WinnerProps {
  game: Game;
}

const Winner: React.FC<WinnerProps> = (props) => {
  const { game } = props;
  const classList =
    game.winner == null ? "x o" : game.winner == true ? "x" : "o";
  return (
    <div className="bg-white h-[308px] w-[308px] flex flex-col justify-center items-center">
      <div>
        <div className={`cell ` + classList}></div>
        <div className="text-5xl font-bold">{game.status}</div>
      </div>
    </div>
  );
};

export default Winner;

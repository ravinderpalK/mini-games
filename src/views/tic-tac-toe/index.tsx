import { useState } from "react";
import Board from "./Board";
import Scores from "./Scores";

const TicTacToe: React.FC = () => {
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div>
        <Scores xScore={xScore} oScore={oScore} />
      </div>
      <div className="mt-20">
        <Board
          xScore={xScore}
          oScore={oScore}
          setXScore={setXScore}
          setOScore={setOScore}
        />
      </div>
    </div>
  );
};

export default TicTacToe;

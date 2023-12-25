interface Props {
  win: boolean;
  restart: () => void;
}
const Result: React.FC<Props> = (props) => {
  const { restart, win } = props;
  return (
    <div className="flex flex-col h-40 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div
          className={`text-3xl font-bold ${
            win ? "text-green-600" : "text-red-600"
          }`}
        >
          {win ? "You Won" : "You Lose"}
        </div>
        <button
          onClick={restart}
          className="mt-6 px-6 py-1 border-2 rounded-md"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Result;

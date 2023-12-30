const GameOver: React.FC<{ restart: () => void }> = (props) => {
  const { restart } = props;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="flex flex-col px-10 py-16 justify-center bg-gray-300 rounded-lg">
        <div className="text-4xl font-bold">Game Over</div>
        <button
          onClick={restart}
          className="mt-10 px-6 py-1 text-xl rounded-md bg-gray-400"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameOver;

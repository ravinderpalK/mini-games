import Board from "./Board";
import words from "./five_letter_words.json";

const Wordle: React.FC = () => {
  const selectedWordIndex = Math.floor(Math.random() * words.length);
  const selectedWord = words[selectedWordIndex];
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Board selectedWord={selectedWord} />
    </div>
  );
};

export default Wordle;

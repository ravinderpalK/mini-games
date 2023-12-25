import { useState } from "react";
import KeyBoard from "./Keyboard";
import words from "./five_letter_words.json";
import Result from "./Result";

interface Props {
  selectedWord: string;
}

const Board: React.FC<Props> = (props) => {
  const { selectedWord } = props;
  const [attempt, setAttempt] = useState(0);
  const [position, setPosition] = useState(0);
  const [gameOn, setGameOn] = useState(true);
  const [win, setWin] = useState(false);

  const [grid, setGrid] = useState(Array(30).fill(""));
  const [gridColors, setGridColor] = useState(Array(30).fill(null));

  const [keysColor, setKeysColor] = useState(Array(26).fill(null));

  const isValidWord = (value: string): boolean => {
    let l = 0;
    let h = words.length - 1;
    while (l <= h) {
      let m = Math.floor((l + h) / 2);
      if (words[m] == value) return true;
      else if (words[m] < value) l = m + 1;
      else h = m - 1;
    }
    return false;
  };

  const result = (win: boolean) => {
    setWin(win);
    setGameOn(false);
  };

  const checkWord = (value: string) => {
    for (let i = 0; i < 5; i++) {
      let index = selectedWord.search(value[i]);
      if (index != -1) {
        if (selectedWord[i] == value[i]) {
          gridColors[5 * attempt + i] = 1;
          keysColor[value.charCodeAt(i) - 97] = 1;
        } else {
          gridColors[5 * attempt + i] = 0;
          keysColor[value.charCodeAt(i) - 97] = 0;
        }
      } else {
        gridColors[5 * attempt + i] = -1;
        keysColor[value.charCodeAt(i) - 97] = -1;
      }
    }
    if (value == selectedWord) result(true);
  };

  let update = (value: string) => {
    console.log(selectedWord);
    if (win) return;
    if (value == "BACKSPACE") {
      if (position <= 0) return;
      grid[5 * attempt + position - 1] = "";
      setPosition(position - 1);
    } else if (value == "ENTER") {
      if (position < 4) return;
      let pos = 5 * attempt;
      const enteredWord = grid
        .slice(pos, pos + 5)
        .join("")
        .toLocaleLowerCase();
      if (isValidWord(enteredWord)) {
        checkWord(enteredWord);
        setAttempt(attempt + 1);
        setPosition(0);
      }
    } else {
      if (position > 4) return;
      grid[5 * attempt + position] = value;
      console.log(position);
      setPosition(position + 1);
    }
  };

  const restart = () => {
    setAttempt(0);
    setPosition(0);
    setGameOn(true);
    setWin(false);
    setGrid(Array(30).fill(""));
    setGridColor(Array(30).fill(null));
    setKeysColor(Array(26).fill(null));
  };
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-5 gap-1">
          {grid.map((value, idx) => {
            return (
              <div
                key={idx}
                className={`h-14 w-14 ${
                  gridColors[idx] == null ? "text-black" : "text-white"
                }  font-bold text-3xl border-2 flex justify-center items-center ${
                  gridColors[idx] == 1
                    ? "bg-green-600"
                    : gridColors[idx] == 0
                    ? "bg-yellow-600"
                    : gridColors[idx] == -1
                    ? "bg-gray-500"
                    : ""
                }`}
              >
                <span>{value}</span>
              </div>
            );
          })}
        </div>
        <div>
          {gameOn ? (
            <KeyBoard update={update} keysColor={keysColor} />
          ) : (
            <Result win={win} restart={restart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;

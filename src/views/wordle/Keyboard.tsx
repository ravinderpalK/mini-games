import { useEffect } from "react";

interface Props {
  update: (value: string) => void;
  keysColor: any;
}
const KeyBoard: React.FC<Props> = (props) => {
  const { update, keysColor } = props;

  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];
  const l1 = keys.slice(0, 10);
  const l2 = keys.slice(10, 19);
  const l3 = keys.slice(19, 26);

  useEffect(() => {
    document.addEventListener("keyup", detectKeyDown);
    return () => document.removeEventListener("keyup", detectKeyDown);
  });

  const detectKeyDown = (e: any) => {
    let key = e.key.toLocaleUpperCase();
    if (
      e.keyCode == 13 ||
      e.keyCode == 8 ||
      (e.keyCode >= 65 && e.keyCode <= 90)
    ) {
      update(key);
    }
  };

  return (
    <div className="grid grid-rows-3 mt-10">
      <div className="flex">
        {l1.map((value, idx) => (
          <div
            key={idx}
            onClick={() => update(value)}
            className={`w-10 h-14 text-xl font-bold m-1 text-center rounded flex justify-center items-center  ${
              keysColor[value.charCodeAt(0) - 65] == 1
                ? "bg-green-600 text-white"
                : keysColor[value.charCodeAt(0) - 65] == 0
                ? "bg-yellow-600 text-white"
                : keysColor[value.charCodeAt(0) - 65] == -1
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {l2.map((value, idx) => (
          <div
            key={idx}
            onClick={() => update(value)}
            className={`w-10 h-14 text-xl font-bold m-1 text-center rounded flex justify-center items-center ${
              keysColor[value.charCodeAt(0) - 65] == 1
                ? "bg-green-600 text-white"
                : keysColor[value.charCodeAt(0) - 65] == 0
                ? "bg-yellow-600 text-white"
                : keysColor[value.charCodeAt(0) - 65] == -1
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div
          onClick={() => update("ENTER")}
          className="w-20 h-14 bg-gray-200 text-base font-bold m-1 text-center rounded flex justify-center items-center"
        >
          <span>ENTER</span>
        </div>
        {l3.map((value, idx) => (
          <div
            key={idx}
            onClick={() => update(value)}
            className={`w-10 h-14 text-xl font-bold m-1 text-center rounded flex justify-center items-center ${
              keysColor[value.charCodeAt(0) - 65] == 1
                ? "bg-green-600 text-white"
                : keysColor[value.charCodeAt(0) - 65] == 0
                ? "bg-yellow-600 text-white"
                : keysColor[value.charCodeAt(0) - 65] == -1
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {value}
          </div>
        ))}
        <div
          onClick={() => update("BACKSPACE")}
          className="w-16 h-14 bg-gray-200 text-base font-bold m-1 text-center rounded flex justify-center items-center"
        >
          <span>DEL</span>
        </div>
      </div>
    </div>
  );
};

export default KeyBoard;

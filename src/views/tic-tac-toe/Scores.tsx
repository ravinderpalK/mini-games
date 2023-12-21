export interface Scoresprops {
  xScore: number;
  oScore: number;
}
const Scores: React.FC<Scoresprops> = (props) => {
  const { xScore, oScore } = props;
  return (
    <div className="flex">
      <div className="flex relative border-2 mx-1 w-36 rounded">
        <div className="pl-4 py-1">X</div>
        <div className="absolute right-0 pr-4 py-1">{xScore}</div>
      </div>
      <div className="flex relative border-2 mx-1 w-36 rounded">
        <div className="pl-4 py-1">O</div>
        <div className="absolute right-0 pr-4 py-1">{oScore}</div>
      </div>
    </div>
  );
};

export default Scores;

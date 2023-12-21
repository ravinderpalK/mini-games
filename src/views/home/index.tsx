import { Link } from "react-router-dom";


const Games : React.FC = () => {
  const games = ['Tic-Tac-Toe', 'Wordle', 'Snake', 'Tetris'];
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center h-1/4 w-1/2">
        {games.map((game, idx) => {
          return (
            <Link to={`/${game.toLocaleLowerCase()}`} key={idx} className="flex flex-1 border-2 rounded-sm items-center mx-2 bg-gray-100 justify-center">
              <div className="text-xl">{game}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Games;
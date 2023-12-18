import o from "./o.jpeg";
import x from "./x.jpeg";
import blank from "./blank.jpg";



const TicTacToe : React.FC = () => {
  let player : boolean = true;
  let grid = Array(9).fill(-1);

  let win = (player : boolean) => {
    console.log("win ");
  }

  let checkWin = (player : boolean, id : number) => {
    //for row
    let r = Math.floor(id/3); 
    for (let i=r*3; i<(r*3+3); i++) {
      if (grid[i] != player) {
        break;
      }
      if (i==(r*3+2)) win(player);
    }

    //for col
    let c = (id > 2)? ((id-3 > 2) ? id-6 : id-3) : id;
    console.log(c);
    for (let i=c; i<9; i=i+3) {
      if (grid[i] != player) 
        break;
      if (i==c+6) win(player);
    } 

    // for diagonals
    if (id%2 != 0) return;
    else if (grid[0]==player && grid[4]==player && grid[8]==player) win(player);
    else if (grid[2]==player && grid[4]==player && grid[6]==player) win(player);
  }

  let update = (e: any)  => {
    const id = e.target.id;
    if (grid[id] != -1) return;
    if (player) {
      e.target.src = x;
      grid[id] = 1;
    }
    else {
      e.target.src = o;
      grid[id] = 0;
    }
    checkWin(player, id);
    player = !player;
  }
  
  let gridElement = [];
  for (let i=0; i<9; i++)
    gridElement.push(
      <div key={i+1} onClick={update} className="bg-gray-100 h-full w-full">
        <img id={`${i}`} className="p-8 h-36 w-40" src={blank}/>
      </div>
    );

    return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="grid grid-cols-3 gap-2 w-1/3">
        {gridElement}
      </div>
    </div>
  )
}

export default TicTacToe;
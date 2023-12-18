import {
  createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "../layouts/home";
import Games from "../views/games";
import TicTacToe from "../views/tic-tac-toe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children : [
      {index: true, element: <Games/>},
      {
        path: 'tic-tac-toe',
        element: <TicTacToe/>
      }
    ]
  },
]);

export default router;
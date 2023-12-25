import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/home";
import Games from "../views/home";
import TicTacToe from "../views/tic-tac-toe";
import Wordle from "../views/wordle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Games /> },
      {
        path: "tic-tac-toe",
        element: <TicTacToe />,
      },
      {
        path: "wordle",
        element: <Wordle />,
      },
    ],
  },
]);

export default router;

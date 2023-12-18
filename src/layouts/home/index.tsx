import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const HomeLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <nav>
        <Appbar/>
      </nav>
      <main className="flex-1">  
        <Outlet />
      </main>
    </div>
  )
}



export default HomeLayout;
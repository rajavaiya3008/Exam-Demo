import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./shared/Header";

function App() {
  return (
    <div>
      <div className="h-[50px] dark:bg-gray-800 border-b border-gray-400 fixed w-[100%] z-10">
        <Header />
      </div>

      <div className="text-black h-[100vh] overflow-x-hidden">
        <div className="h-auto border-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;

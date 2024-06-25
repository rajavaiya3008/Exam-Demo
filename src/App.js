import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="text-black">

      {/* <div>
        App
      </div> */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="text-black h-[100vh] overflow-x-hidden">

      <div className='h-[50px] dark:bg-gray-800 border-b border-gray-400'>
        <Header />
      </div>
      <div className='h-[100vh]'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

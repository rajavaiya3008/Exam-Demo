import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { currUserRole } from '../Current User/currentUser';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../redux-toolkit/slices/user';

const Navbar = ({navItems}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    dispatch(handleLogin(false));
    navigate('/login',{replace:true});
  }


  return (
    <div >
        <div className=" px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col h-[100vh]">

          <ul className="space-y-2 font-medium">
            {
                navItems.map((item,i) => <li key={i}>
                                            <NavLink 
                                             to={item.path}
                                             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{item.name}</NavLink>
                                          </li>)
            }
            <li>
              <NavLink 
              to={`/${currUserRole}/reset-password`}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >Reset</NavLink>
            </li>
            <li>
              <button 
              onClick={handleLogout}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
              >Logout</button>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar

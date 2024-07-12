import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getCurrUserData } from '../Current User/currentUser';
import { useDispatch } from 'react-redux';
import { RiLockPasswordFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { handleLogin } from '../redux-toolkit/slices/user';
import { loadViewExamData } from '../redux-toolkit/slices/teacher';
import { loadAllExamData } from '../redux-toolkit/slices/student';

const Navbar = ({navItems}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const edit = location.pathname.split('/')[2]

  const currUserRole = getCurrUserData().role;

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem('login',false);
    dispatch(handleLogin(false))
    dispatch(loadViewExamData([]));
    dispatch(loadAllExamData([]));
    navigate('/login',{replace:true});
  }


  return (
    <div >
        <div className=" overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col h-[100vh]">

          <ul className="space-y-2 font-medium">
            {
                navItems.map((item,i) => <li key={i}>
                                            <NavLink 
                                             to={item.path}
                                             className={`flex justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${(item.path === 'view-exam' && edit === 'edit-exam')|| (item.path === 'allstudent' && edit === 'view-student-detail') || (item.path === 'all-exam' && (edit === 'give-exam' || edit === 'show-result')) ? 'active':'' }`}>{item.name} {item.icon}</NavLink>
                                          </li>)
            }
            <li>
              <NavLink 
              to={`/${currUserRole}/reset-password`}
              className="flex justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >Reset <RiLockPasswordFill style={{fontSize:25}}/></NavLink>
            </li>
            <li>
              <button 
              onClick={handleLogout}
              className="flex justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
              >Logout <TbLogout style={{fontSize:25}}/></button>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar

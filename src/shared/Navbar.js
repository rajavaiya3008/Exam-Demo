import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getCurrUserData } from '../Current User/currentUser';
import { useDispatch } from 'react-redux';
import { RiLockPasswordFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { handleLogin, handleMenu } from '../redux-toolkit/slices/user';
import { loadViewExamData } from '../redux-toolkit/slices/teacher';
import { loadAllExamData } from '../redux-toolkit/slices/student';
import { IsClearItem, IsSetItem } from '../utils/IsFunction';
import { LOGIN_PAGE } from '../utils/constant';

const Navbar = ({navItems}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const edit = location.pathname.split('/')[2]

  const currUserRole = getCurrUserData().role;

  const handleLogout = () => {
    IsClearItem()
    IsSetItem('login',false);
    dispatch(handleLogin(false))
    dispatch(loadViewExamData([]));
    dispatch(loadAllExamData([]));
    navigate(LOGIN_PAGE,{replace:true});
  }


  return (
    <div className='w-[100%] h-[100%] bg-gray-800 bg-opacity-90 fixed' onClick={() => dispatch(handleMenu())}>
        <div className="w-[200px] h-[100%] overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col" onClick={(e) => e.stopPropagation()}>

          <ul className="space-y-2 font-medium">
            {
                navItems.map((item,i) => <li key={i} onClick={() => dispatch(handleMenu())}>
                                            <NavLink 
                                             to={item.path}
                                             className={`flex gap-[20px] text-[20px] items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${(item.path === 'view-exam' && edit === 'edit-exam')|| (item.path === 'allstudent' && edit === 'view-student-detail') || (item.path === 'all-exam' && (edit === 'give-exam' || edit === 'show-result')) ? 'active':'' }`}>{item.icon} {item.name}</NavLink>
                                          </li>)
            }
            <li onClick={() => dispatch(handleMenu())}>
              <NavLink 
              to={`/${currUserRole}/reset-password`}
              className="flex gap-[20px] text-[20px] items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              ><RiLockPasswordFill style={{fontSize:25}}/> Reset</NavLink>
            </li>
            <li onClick={() => dispatch(handleMenu())}>
              <button 
              onClick={handleLogout}
              className="flex gap-[20px] text-[20px] items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
              ><TbLogout style={{fontSize:25}}/> Logout</button>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar

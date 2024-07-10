import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { getCurrUserData } from '../Current User/currentUser';

const Header = () => {

    const Login = JSON.parse(localStorage.getItem('login'));
    const location = useLocation();
    const role = getCurrUserData().role;

  return (
    <div className='h-[50px] text-gray-200 flex justify-between'>
        <div className='text-4xl ml-[95px] flex justify-center items-center'>
            <p>Exam</p>
        </div>

        {
            !Login ?
            <div className='mr-[60px] flex justify-center items-center'>
                {
                    location.pathname !== '/login' &&
                        <NavLink to={'/login'} className='border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white'>Login</NavLink>
                }
                {
                    location.pathname !== '/signup' &&
                        <NavLink to={'/signup'} className='ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white'>Sign Up</NavLink>
                }
            </div> : 
            <div className='mr-[60px] flex justify-center items-center'>
                {
                        location.pathname === '/'  && Login &&
                            <NavLink to={`${role}/dashboard`} className='ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white'>DashBoard</NavLink>
                }
            </div>

        }
    </div>
  )
}

export default Header
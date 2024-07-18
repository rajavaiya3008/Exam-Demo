import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { getCurrUserData } from '../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { handleMenu } from '../redux-toolkit/slices/user';
import { TbMenu2 } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import { IsGetItem } from '../utils/IsFunction';
import { LOGIN_PAGE, SIGNUP_PAGE } from '../utils/constant';

const Header = () => {

    const dispatch = useDispatch();
    const Login = IsGetItem('login');
    const location = useLocation();
    const role = getCurrUserData().role;
    const menu = useSelector(state => state.user.menu)

  return (
    <div className='h-[50px] text-gray-200 flex justify-between'>
        <div className='ml-[10px] gap-[10px] flex justify-center items-center'>
            {
                Login && location.pathname !== '/' &&
                    <button 
                    className=' menu-btn'
                    onClick={() => dispatch(handleMenu())}
                    >{menu ? <IoCloseSharp style={{fontSize:25}}/> :<TbMenu2 style={{fontSize:25}}/>}</button>
            }
            <p className='text-4xl'>Exam</p>
        </div>

        {
            !Login ?
            <div className='mr-[30px] flex justify-center items-center'>
                {
                    location.pathname !== '/login' &&
                        <NavLink to={LOGIN_PAGE} className='border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white'>Login</NavLink>
                }
                {
                    location.pathname !== '/signup' &&
                        <NavLink to={SIGNUP_PAGE} className='w-max ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white'>Sign Up</NavLink>
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
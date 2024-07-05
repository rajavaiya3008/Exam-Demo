import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

const Header = () => {

    const login = useSelector(state => state.user.login);
    const Login = JSON.parse(localStorage.getItem('login'));

  return (
    <div className='h-[50px] text-gray-200 flex justify-between'>
        <div className='text-4xl ml-[95px] flex justify-center items-center'>
            <p>Exam</p>
        </div>

        {
            !Login &&
            <div className='mr-[60px] flex justify-center items-center'>
                <NavLink to={'/login'} className='border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white'>Login</NavLink>
                <NavLink to={'/signup'} className='ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white'>Sign Up</NavLink>
            </div>
        }
    </div>
  )
}

export default Header
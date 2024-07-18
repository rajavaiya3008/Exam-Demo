import React from 'react'
import Navbar from '../../shared/Navbar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PiExamFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { RiDashboardHorizontalFill } from "react-icons/ri"
import StudentDashboard from './childroutes/StudentDashboard';
import { useSelector } from 'react-redux';
import { ALL_EXAM, STUDENT_PROFILE } from '../../utils/constant';

const Student = () => {

  const location = useLocation();
  const menu = useSelector(state => state.user.menu);

  const studentRoutes = [
    {
      path:'/student/dashboard',
      name:'Dashboard',
      icon:<RiDashboardHorizontalFill style={{fontSize:25}}/>
    },
    {
      path:ALL_EXAM,
      name:'Exams',
      icon:<PiExamFill style={{fontSize:25}}/>
    },
    {
      path:STUDENT_PROFILE,
      name:'Profile',
      icon:<CgProfile style={{fontSize:25}}/>
    }
  ]

  return (
    <div className='flex h-[100%] w-[100vw]'>
      <div className={`w-[100%] z-10 fixed h-[100%] mt-[50px] overflow-scroll ${menu ? 'show-menu' :'hide-menu'}`}>
        <Navbar navItems={studentRoutes}/>
      </div>
      <div className='w-full overflow-auto mb-[20px]'>
        {
          location.pathname === '/student' || location.pathname === '/student/' ? <StudentDashboard /> : <Outlet />
        }
      </div>
    </div>
  )
}

export default Student
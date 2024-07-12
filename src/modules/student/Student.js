import React from 'react'
import Navbar from '../../components/Navbar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PiExamFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { RiDashboardHorizontalFill } from "react-icons/ri"
import { getCurrUserData } from '../../Current User/currentUser';
import StudentDashboard from './childroutes/StudentDashboard';

const Student = () => {

  const location = useLocation();

  const studentRoutes = [
    {
      path:'/student/dashboard',
      name:'Dashboard',
      icon:<RiDashboardHorizontalFill style={{fontSize:25}}/>
    },
    {
      path:'all-exam',
      name:'Exams',
      icon:<PiExamFill style={{fontSize:25}}/>
    },
    {
      path:'student-profile',
      name:'Profile',
      icon:<CgProfile style={{fontSize:25}}/>
    }
  ]

  return (
    <div className='flex h-[100vh] w-[100vw]'>
      <div className='w-[20%] h-[100vh] sidebar'>
        <Navbar navItems={studentRoutes}/>
      </div>
      <div className='w-full'>
        {
          location.pathname === '/student' || location.pathname === '/student/' ? <StudentDashboard /> : <Outlet />
        }
      </div>
    </div>
  )
}

export default Student
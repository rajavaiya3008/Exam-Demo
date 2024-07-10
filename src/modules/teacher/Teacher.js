import React from 'react'
import Navbar from '../../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { PiStudentFill } from "react-icons/pi";
import { PiStudentThin } from "react-icons/pi";
import { PiExamFill } from "react-icons/pi";
import { PiExamLight } from "react-icons/pi";
import { RiDashboardHorizontalFill } from "react-icons/ri"
import TeacherDashbord from './childroutes/TeacherDashbord';

const Teacher = () => {

  const location = useLocation();

  const teacherRoutes = [
    {
      path:'/teacher/dashboard',
      name:'Dashboard',
      icon:<RiDashboardHorizontalFill style={{fontSize:25}}/>
    },
    {
      path:'allstudent',
      name:'All Students',
      icon:<PiStudentThin style={{fontSize:25}}/>
    },
    // {
    //   path:'verified-student',
    //   name:'Verified Students',
    //   icon:<PiStudentFill style={{fontSize:25}}/>
    // },
    {
      path:'create-exam',
      name:'CreateExam',
      icon:<PiExamFill style={{fontSize:25}}/>
    },
    {
      path:'view-exam',
      name:'View Exam',
      icon:<PiExamLight style={{fontSize:25}}/>
    }
  ]


  return (
    <div className='flex h-[100vh] w-[100vw]'>
      <div className='w-[20%] h-[100vh]'>
        <Navbar navItems={teacherRoutes}/>
      </div>
      <div className='w-full'>
        {
          location.pathname === '/teacher' || location.pathname === '/teacher/' ? <TeacherDashbord /> : <Outlet />
        }
      </div>
    </div>
  )
}

export default Teacher
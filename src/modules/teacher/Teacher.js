import React from 'react'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import { PiStudentFill } from "react-icons/pi";
import { PiStudentThin } from "react-icons/pi";
import { PiExamFill } from "react-icons/pi";
import { PiExamLight } from "react-icons/pi";

const Teacher = () => {

  const teacherRoutes = [
    {
      path:'allstudent',
      name:'All Students',
      icon:<PiStudentThin style={{fontSize:25}}/>
    },
    {
      path:'verified-student',
      name:'Verified Students',
      icon:<PiStudentFill style={{fontSize:25}}/>
    },
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
        <Outlet />
      </div>
    </div>
  )
}

export default Teacher
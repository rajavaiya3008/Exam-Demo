import React from 'react'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import { PiExamFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

const Student = () => {

  const studentRoutes = [
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
      <div className='w-[20%] h-[100vh]'>
        <Navbar navItems={studentRoutes}/>
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default Student
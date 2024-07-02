import React from 'react'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'

const Teacher = () => {

  const teacherRoutes = [
    {
      path:'allstudent',
      name:'All Students'
    },
    {
      path:'verified-student',
      name:'Verified Students'
    },
    {
      path:'create-exam',
      name:'CreateExam'
    },
    {
      path:'view-exam',
      name:'View Exam'
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
import React from 'react'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'

const Student = () => {

  const studentRoutes = [
    {
      path:'all-exam',
      name:'Exams'
    },
    {
      path:'student-profile',
      name:'Profile'
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
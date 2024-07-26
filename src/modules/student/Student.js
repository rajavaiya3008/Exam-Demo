import React from 'react'
import Navbar from '../../shared/Navbar'
import { Outlet } from 'react-router-dom'
import { PiExamFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { RiDashboardHorizontalFill } from "react-icons/ri"
import { useSelector } from 'react-redux';
import { ALL_EXAM, STUDENT_DASHBOARD, STUDENT_PROFILE } from '../../utils/routeConstant';

const studentRoutes = [
  {
    path:STUDENT_DASHBOARD,
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

const Student = () => {

  const menu = useSelector(state => state.user.menu);

  return (
    <div className='flex h-[100%] w-[100vw]'>
      <div className={`w-[100%] z-10 fixed h-[100%] mt-[50px] overflow-scroll ${menu ? 'show-menu' :'hide-menu'}`}>
        <Navbar navItems={studentRoutes}/>
      </div>
      <div className='w-full overflow-auto mb-[20px]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Student
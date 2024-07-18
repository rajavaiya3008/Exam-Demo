import React, { useEffect } from 'react'
import { getCurrUserData } from '../../../Current User/currentUser'
import { Navigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user'

const TeacherDashbord = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handlePrevVisitedPage(1));
  },[])

  // if(!getCurrUserData().token){
  //   return <Navigate to={'/login'}/>
  // }

  return (
    <div className='flex justify-center items-center text-2xl mt-[70px]'>Teacher Dashboard</div>
  )
}

export default TeacherDashbord
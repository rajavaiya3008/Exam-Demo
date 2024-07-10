import React, { useEffect } from 'react'
import { getCurrUserData } from '../../../Current User/currentUser'
import { Navigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user'

const StudentDashboard = () => {

  const dispatch = useDispatch();

  // if(!getCurrUserData().token){
  //   return <Navigate to={'/login'}/>
  // }
  useEffect(() => {
    dispatch(handlePrevVisitedPage(1));
  },[])

  return (
    <div className='h-[100vh] flex justify-center items-center text-2xl'>Student Dashboard</div>
  )
}

export default StudentDashboard
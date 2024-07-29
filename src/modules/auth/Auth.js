import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getCurrUserData } from '../../utils/currentUser';
import { LOGIN_PAGE, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from '../../utils/routeConstant';
import { isStudent } from '../../utils/commonFunction';

const Auth = ({role}) => {

  const navigate = useNavigate()
  const {role:currUserRole} = getCurrUserData();

  useEffect(() => {
    (!currUserRole && navigate(LOGIN_PAGE))
  },[])

  return (
    <div>
        <div>
            {
              role.includes(currUserRole) ? <Outlet/> : <Navigate to={isStudent() ? STUDENT_DASHBOARD : TEACHER_DASHBOARD}/>
            }
        </div>
    </div>
  )
}

export default Auth
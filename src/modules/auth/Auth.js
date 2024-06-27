import React from 'react'
import { Outlet } from 'react-router-dom'
import { currUserRole } from '../../Current User/currentUser'

const Auth = ({role}) => {

  // const userData = localStorage.getItem('userData');
  // const currUserData = JSON.parse(userData);
  // console.log('currUserData', currUserData);

  return (
    <div>
        {/* <div>Auth</div> */}

        <div>
            {
              role.includes(currUserRole) && <Outlet/>
            }
        </div>
    </div>
  )
}

export default Auth
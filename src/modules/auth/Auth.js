import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = ({role}) => {

  const userData = localStorage.getItem('userData');
  const currUserData = JSON.parse(userData);
  console.log('currUserData', currUserData);

  return (
    <div>
        <div>Auth</div>

        <div>
            {
              role.includes(currUserData.role) && <Outlet/>
            }
        </div>
    </div>
  )
}

export default Auth
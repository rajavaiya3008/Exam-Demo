import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';
import { getCurrUserData} from '../../Current User/currentUser';

const Auth = ({role}) => {

  const decode = jwtDecode(getCurrUserData().token);
  console.log('decode', decode);

  let currDate = (new Date()).getTime();
  console.log('currDate', currDate);
  let milliSecond = currDate/1000;
  console.log('milliSecond', milliSecond)
  let out = Math.floor(milliSecond);
  console.log('out', out)
  // const milliSecond = currDate.getMilliseconds();
  // console.log('milliSecond', milliSecond);


  if(decode?.exp < out){
    localStorage.setItem('login',false);
    return <Navigate to={'/login'}/>
  }
  const {role:currUserRole} = getCurrUserData();



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
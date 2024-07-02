const userData = localStorage.getItem('userData');
const currUserData = JSON.parse(userData);

// let token = '';
// let currUserRole = '';

export const getCurrUserData = () => {
    const userData = localStorage.getItem('userData');
    const currUserData = JSON.parse(userData);
    console.log('userData',{userData:currUserData,token:currUserData?.token,role:currUserData?.role});
    return {userData:currUserData,token:currUserData?.token,role:currUserData?.role}
}

export const token = getCurrUserData()?.token
export const currUserRole = getCurrUserData()?.role
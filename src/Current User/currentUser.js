
export const getCurrUserData = () => {
    const userData = localStorage.getItem('userData');
    const currUserData = JSON.parse(userData);
    return {userData:currUserData,token:currUserData?.token,role:currUserData?.role}
}

export const token = getCurrUserData()?.token
export const currUserRole = getCurrUserData()?.role
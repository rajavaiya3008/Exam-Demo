import { getLocalStorageItem } from "./localStorageFunction";

export const getCurrUserData = () => {
    const currUserData = getLocalStorageItem('userData');
    return {userData:currUserData,token:currUserData?.token,role:currUserData?.role}
}

export const token = getCurrUserData()?.token
export const currUserRole = getCurrUserData()?.role
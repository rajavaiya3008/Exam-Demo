const userData = localStorage.getItem('userData');
const currUserData = JSON.parse(userData);

export const token = currUserData.token;
export const currUserRole = currUserData.role;
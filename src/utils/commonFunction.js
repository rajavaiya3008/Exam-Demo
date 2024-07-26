import { getCurrUserData } from "./currentUser";

export const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
  }

export const isStudent = getCurrUserData()?.role === 'student'


import { useDispatch, useSelector } from "react-redux";
import { loadStudentProfile } from "../../redux/slices/student";




export const useProfile = () => {
    const dispatch = useDispatch()
    const studentProfile = useSelector(state => state.student.studentProfile)
    const updateProfile = (data) => {
        const { name, value } = data;
        const updatedProfile = {
            ...studentProfile,
            [name]:value
        }
        dispatch(loadStudentProfile(updatedProfile))
      }

    return {updateProfile}
}
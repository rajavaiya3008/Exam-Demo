import { useDispatch } from "react-redux"

export const useHandleInput = () => {
    const dispatch = useDispatch()
    const handleInputChange = (e,dispatchAction) => {
        const {value} = e.target
        dispatch(dispatchAction(value))
    }
    return {handleInputChange}
}
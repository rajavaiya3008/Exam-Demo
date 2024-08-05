import { useSelector } from "react-redux";

export const useLoading = () => {
    const status = useSelector(state => state.api.status)

    return status === 'loading'
}
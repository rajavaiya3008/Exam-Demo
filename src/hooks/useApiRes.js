import { useNavigate } from "react-router";
import { clearLocalStorageItem } from "../utils/localStorageFunction";
import { LOGIN_PAGE } from "../utils/routeConstant";
import { toastError } from "../utils/toastFunction";

export const useApiRes = () => {
  const navigate = useNavigate();
  const handleApiResponse = ({ statusCode, path, msg }) => {
    if (statusCode === 401) {
      clearLocalStorageItem();
      navigate(LOGIN_PAGE);
      return true;
    }
    if (statusCode === 500) {
      if(msg){
        toastError(msg)
      }
    // // console.log('msg', msg)
    // (msg && toastError(msg))
      (path && navigate(path))
      return true;
    }
    return false;
  };

  return { handleApiResponse };
};

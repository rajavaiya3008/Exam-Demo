import { useDispatch, useSelector } from "react-redux";
import { handleError, handleLogin, handleLoginData, initiateLoginData } from "../../redux-toolkit/slices/user";
import { validateData } from "../../Validation/validation";
import { fetchData } from "../../redux-toolkit/slices/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import { IsSetItem } from "../../utils/IsFunction";




export const useLoginData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginData = useSelector(state => state.user.loginData);
    const error = useSelector(state => state.user.error);
    const [disable,setDisable] = useState(false);


    const loginField = [
        {
          type:'email',
          id:'email',
          name:'email',
          label:`Enter Email`,
          data:loginData,
          error:error,
          updateData:handleLoginData
        },
        {
          type:'password',
          id:'password',
          name:'password',
          label:'Enter Password',
          data:loginData,
          error:error,
          updateData:handleLoginData
        }
      ]
    
    const validate = {
        email: [{required:true,message:'Please Enter Email'},{pattern:/^[a-zA-Z0-9]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/,message:'Enter Valid Email'}],
        password:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'},{pattern:/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,message:'Enter Valid Password'}],
    }

    const handleSubmit = async() => {
        try{
          const error = validateData(loginData,validate)
          if(Object.keys(error).length !== 0){
            dispatch(handleError(error));
            return;
          }
          setDisable(true);
          const config = {
            method:'post',
            url:'users/Login',
            data:loginData
          }
          const res = await dispatch(fetchData(config))
          console.log('res', res)
          if(res.payload.statusCode === 500){
            toastError(res.payload.message);
            setDisable(false);
            return;
          }
          if(res.payload.statusCode === 400){
            toastError('white space is not consider');
            return;
          }
          toastSuccess('Login Successful');
          IsSetItem('userData',res.payload.data);
          IsSetItem('login',true)
          dispatch(handleLogin(true));
          dispatch(initiateLoginData());
        //   res.payload.data.role === 'student' ? navigate('/student-dashboard',{replace:true}) : navigate('/teacher-dashboard',{replace:true})
          navigate(`/${res.payload.data.role}/dashboard`,{replace:true});
        }catch(error){
          setDisable(false);
          console.log('error', error);
        }
    }

    return {
        loginField,
        disable,
        handleSubmit
    }
}
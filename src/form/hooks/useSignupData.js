import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSignupData, initiateSignupData } from "../../redux-toolkit/slices/user";
import { validateData } from "../../Validation/validation";
import { fetchData } from "../../redux-toolkit/slices/api";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import { LOGIN_PAGE } from "../../utils/constant";




export const useSignupData = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signupData = useSelector(state => state.user.signupData);
    const error = useSelector(state => state.user.error);
    const [disable,setDisable] = useState(false);


    const signupField = [
        {
          type:'text',
          id:'name',
          name:'name',
          label:'Enter Name',
          data:signupData,
          error:error,
          updateData:handleSignupData
        },
        {
          type:'email',
          id:'email',
          name:'email',
          label:'Enter Email',
          data:signupData,
          error:error,
          updateData:handleSignupData
        },
        {
          type:'password',
          id:'password',
          name:'password',
          label:'Enter Password',
          data:signupData,
          error:error,
          updateData:handleSignupData
        }
      ]
    
    const validate = {
        name:[{required:true,message:'Please Enter Name'},{length:3,message:'username Must be 3 char'}],
        email: [{required:true,message:'Please Enter Email'},{pattern:/^[a-zA-Z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,message:'Enter Valid Email'}],
        password:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'}],
    
    }

    const handleSignup = async() => {
        try{
          const error = validateData(signupData,validate);
          if(Object.keys(error).length !== 0){
            dispatch(handleError(error));
            return;
          }
          setDisable(!disable);
          const config = {
            method:'post',
            url:'users/SignUp',
            data:signupData
          }
          const res = await dispatch(fetchData(config))
          if(res.payload.statusCode === 400){
            toastError('White space is not consider');
            return;
          }
          if(res?.payload?.statusCode !== 200){
            toastError('Email Already Exist Please Login');
            return;
          }
          dispatch(initiateSignupData());
          toastSuccess('Signup Successful');
          navigate(LOGIN_PAGE,{replace:true});
        }catch(error){
          setDisable(false);
          console.log('error', error)
        }
      }

    return {
        signupField,
        handleSignup,
        disable
    }
}
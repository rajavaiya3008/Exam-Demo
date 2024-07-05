import { useState } from "react";
import { useSelector } from "react-redux";
import { handleSignupData } from "../../redux-toolkit/slices/user";




export const useSignupData = () => {

    const signupData = useSelector(state => state.user.signupData);
    const [disable,setDisable] = useState(false);

    const error = useSelector(state => state.user.error);


    const signupField = [
        {
          type:'text',
          id:'name',
          name:'name',
          label:'Enter Name:',
          data:signupData,
          error:error,
          updateData:handleSignupData
        },
        {
          type:'email',
          id:'email',
          name:'email',
          label:'Enter Email:',
          data:signupData,
          error:error,
          updateData:handleSignupData
        },
        {
          type:'password',
          id:'password',
          name:'password',
          label:'Enter Password:',
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

    return {
        signupField,
        validate
    }
}
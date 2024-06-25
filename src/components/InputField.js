import React from 'react'
import { useDispatch } from 'react-redux';
// import { handleLoginData } from '../redux-toolkit/slices/user';

const InputField = ({fieldData,data,updateData,error}) => {

    console.log('fieldData', fieldData);
    // console.log('loginData', loginData)

    const dispatch = useDispatch();

    



  return (
    <div className='border flex flex-col gap-2 w-[350px]'>
        <label htmlFor={fieldData.id}>{fieldData.label}</label>
        <input 
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
        value={data[fieldData.name]}
        onChange={(e) => {
            let data = {
                name:e.target.name,
                value:e.target.value
            }
            dispatch(updateData(data))
        }}
        className='border-black border'
        />
        {
            error[fieldData.name] ? <span>{error[fieldData.name]}</span> : null
        }
    </div>
  )
}

export default InputField
import { TextField } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import RadioBtn from './RadioBtn';
import { handleError, handleSameQuestions } from '../redux-toolkit/slices/teacher';
import { validateData } from '../Validation/validation';
// import { handleLoginData } from '../redux-toolkit/slices/user';

const InputField = ({fieldData}) => {

    const dispatch = useDispatch();
    console.log('fieldData', fieldData);
    console.log('fieldData.currQuestion', fieldData.currQuestion);
    console.log('fieldData.optionArr', fieldData.optionArr)
    // console.log('loginData', loginData)
    // console.log('fieldData.data[fieldData.name]', fieldData.data[fieldData.name])
    if(fieldData.type === 'radio'){
        console.log('fieldData.ans', fieldData.ans);
        console.log('fieldData.currQuestion', fieldData.currQuestion);
        return <RadioBtn fieldData={fieldData}/>
    }


    



  return (
    <div className='flex flex-col gap-2 w-[250px] mt-[10px]'>
        {/* {
            fieldData.label && <label htmlFor={fieldData.id}>{fieldData.label}</label>
        } */}
        <TextField 
        label={fieldData.label}
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
        value={fieldData?.data?.[fieldData.name]}
        disabled={fieldData.disable}
        variant="outlined"
        onChange={(e) => {
            const {name,value} = e.target;
            // console.log(value.match('(?! ).*[^ ]')[0])
            // const words = value.split(/\s+/).filter(word => word !== '');
            let data = {
                name:name,
                value: value,
                queIndex:fieldData.currQuestion,
                opIndex:fieldData.opIndex,
                ans:fieldData.data[fieldData.id],
                ansIndex:fieldData.ansIndex
            }
            console.log('currQuestion',fieldData.currQuestion)
            if(fieldData?.optionArr?.includes(e?.target?.value)){
                const error = {};
                error[fieldData.name] = 'Option is Already Present';
                dispatch(fieldData.updateData(data))
                dispatch(handleError(error));
                return;
            }

            dispatch(fieldData.updateData(data))
        }}
        />
        {/* <input 
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
        value={fieldData.data[fieldData.name]}
        onChange={(e) => {
            let data = {
                name:e?.target?.name,
                value:e?.target?.value,
                queIndex:fieldData.currQuestion,
                opIndex:fieldData.opIndex,
                ans:fieldData.data[fieldData.id],
                ansIndex:fieldData.ansIndex
            }
            dispatch(fieldData.updateData(data))
        }}
        className='border-black border'
        /> */}
        {
            fieldData?.error[fieldData.name] ? <span className='text-red-500 text-sm'>{fieldData?.error[fieldData.name]}<sup>*</sup></span> : null
        }
    </div>
  )
}

export default InputField
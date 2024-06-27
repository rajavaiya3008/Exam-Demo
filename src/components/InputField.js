import React from 'react'
import { useDispatch } from 'react-redux';
// import { handleLoginData } from '../redux-toolkit/slices/user';

const InputField = ({fieldData}) => {

    console.log('fieldData', fieldData);
    // console.log('loginData', loginData)
    // console.log('fieldData.data[fieldData.name]', fieldData.data[fieldData.name])
    if(fieldData.type === 'radio'){
        console.log('fieldData.ans', fieldData.ans);
        console.log('fieldData.currQuestion', fieldData.currQuestion);
    }

    const dispatch = useDispatch();

    



  return (
    <div className='border flex flex-col gap-2 w-[350px]'>
        {
            fieldData.label && <label htmlFor={fieldData.id}>{fieldData.label}</label>
        }
        <input 
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
        value={fieldData.type !== 'radio' ?fieldData.data[fieldData.name] : ''}
        checked={fieldData.data[fieldData.id] === fieldData.ans}
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
        />
        {
            fieldData?.error[fieldData.name] ? <span>{fieldData?.error[fieldData.name]}</span> : null
        }
    </div>
  )
}

export default InputField
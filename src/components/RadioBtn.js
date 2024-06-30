import { convertLength } from '@mui/material/styles/cssUtils';
import React from 'react'
import { useDispatch } from 'react-redux'

const RadioBtn = ({fieldData}) => {

    const dispatch = useDispatch();
    console.log('fieldData in radioBtn', fieldData);


  return (
    <div>
        <input 
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
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
            console.log('current selected option index',fieldData.opIndex)
            if(fieldData.examData.questions[fieldData.currQuestion].options[fieldData.opIndex] === ''){
                console.log('Enter in tio if');
                return;
            }
            dispatch(fieldData.updateData(data))
        }}
        className='border-black border'
        />
    </div>
  )
}

export default RadioBtn
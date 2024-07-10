import { convertLength } from '@mui/material/styles/cssUtils';
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleAnsIndexes } from '../redux-toolkit/slices/teacher';

const RadioBtn = ({fieldData}) => {

    const dispatch = useDispatch();
    console.log('fieldData', fieldData);

    const ansIndex = useSelector(state => state.teacher.ansIndex)

    // let ansIndex;

    // useEffect(() => {
    //     ansIndex = fieldData.examData.questions[fieldData.currQuestion].options.findIndex((option,i) => option === fieldData?.ans)
    //     console.log('ansIndex', ansIndex)
    //     dispatch(handleAnsIndexes({
    //         ansIndex:ansIndex,
    //         currQuestion:fieldData.currQuestion
    //     }))
    // },[])
    
    // const ansIndex = fieldData?.examData?.questions?.[fieldData.currQuestion]?.options?.findIndex((option,i) => option === fieldData?.ans)
    // console.log('ansIndex', ansIndex)


  return (
    <div>
        <input 
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
        checked={fieldData.data[fieldData.id] === fieldData.ans && ansIndex[fieldData.currQuestion] === fieldData.opIndex }
        onChange={(e) => {
            dispatch(handleAnsIndexes({
                currQuestion:fieldData.currQuestion,
                ansIndex:fieldData.opIndex
            }))
            let data = {
                name:e?.target?.name,
                value:e?.target?.value,
                queIndex:fieldData.currQuestion,
                opIndex:fieldData.opIndex,
                ans:fieldData.data[fieldData.id],
                ansIndex:fieldData.ansIndex
            }
            if(fieldData.examData?.questions[fieldData.currQuestion].options[fieldData.opIndex] === ''){
                return;
            }
            dispatch(fieldData.updateData(data))
        }}
        className='border-black border'
        />
    </div>
  )
}

export default memo(RadioBtn)
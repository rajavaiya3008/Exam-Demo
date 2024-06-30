import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux'

const DropDown = ({dropDownOptions,name,updateData}) => {

    const dispatch = useDispatch();

  return (
    <div className='flex gap-[10px]'>

        
            <label htmlFor={name} className='flex items-center text-xl'>{name}</label>
            <select
                name={name} 
                id={name} 
                onChange={(e) => {
                    console.log('e.target.value', e.target.value)
                    let data = {
                        name:e.target.name,
                        value:e.target.value
                    }
                    dispatch(updateData(data))
                } }
                className='w-[80px]'
                >
                {
                    dropDownOptions.map((option,i) => (<option value={option} key={i}>{option}</option>))
                }
            </select>
        
        
    </div>
  )
}

export default DropDown
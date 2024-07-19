import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DropDown = ({dropDownOptions,name,updateData}) => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.user.error)

  return (
    <div className='w-[250px] mx-auto gap-[10px]'>

        
            {/* <label htmlFor={name} className='flex items-center text-xl'>{name[0].toUpperCase()+name.substring(1)}</label>
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
                {/* <option>Select {name}</option> */}
                {/* {
                    dropDownOptions.map((option,i) => (<option value={option} key={i}>{option}</option>))
                } */}
            {/* </select> */} 

            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{name[0].toUpperCase()+name.substring(1)}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={name}
                // value={dropDownOptions[0]}
                name={name}
                label="Role"
                onChange={(e) => {
                    console.log('e.target.value', e.target.value)
                    let data = {
                        name:e.target.name,
                        value:e.target.value
                    }
                    dispatch(updateData(data))
                } }
            >
                {
                    dropDownOptions.map((option,i) => <MenuItem value={option} key={i}>{option}</MenuItem>)
                }
            </Select>
            </FormControl>

            {
                error?.role ? <span className='text-red-500 text-sm'>{error?.role}</span> : null
            }
        
        
    </div>
  )
}

export default DropDown
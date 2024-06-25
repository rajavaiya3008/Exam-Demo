import React from 'react'
import { useDispatch } from 'react-redux'

const DropDown = ({dropDownOptions,name,updateData}) => {

    const dispatch = useDispatch();

  return (
    <div>
        <label htmlFor={name}>{name}</label>
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
            } }>
            {
                dropDownOptions.map((option,i) => (<option value={option} key={i}>{option}</option>))
            }
        </select>
    </div>
  )
}

export default DropDown
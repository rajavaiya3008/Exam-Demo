import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { hasObjectLength } from "../utils/commonFunction";
import { useGetError } from "../hooks/useError";

const DropDown = ({ fieldData }) => {
  const {name,dropDownOptions,updateData,style} = fieldData || {}
  const dispatch = useDispatch();
  const {error,handleError} = useGetError()
  const label = name?.[0]?.toUpperCase() + name?.substring(1);
  const selectAttribute = { id: name, name:name , label };

  return (
    <div className={`w-[250px] mx-auto gap-[10px] ${style}`}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          defaultValue=''
          {...selectAttribute}
          onChange={(e) => {
            const { name, value } = e?.target || {};
            let data = {
              name,
              value,
            };
            if(updateData){
              dispatch(updateData(data));
            }
            (hasObjectLength(error) && dispatch(handleError({})))
          }}
        >
          {dropDownOptions?.map((option, i) => (
            <MenuItem value={option} name={name} key={i}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error?.[name] && (
        <span className="text-red-500 text-sm">{error?.[name]}</span>
      )}
    </div>
  );
};

export default DropDown;

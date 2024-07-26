import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hasObjectLength } from "../utils/commonFunction";

const DropDown = ({ dropDownOptions, name, value, updateData,style ,clearError}) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const label = name[0].toUpperCase() + name.substring(1);
  const selectAttribute = { id: name, name, value: value, label };

  return (
    <div className={`w-[250px] mx-auto gap-[10px] ${style}`}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
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
            (hasObjectLength(error) && clearError && dispatch(clearError({})))
          }}
        >
          {dropDownOptions.map((option, i) => (
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

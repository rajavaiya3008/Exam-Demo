import { TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { hasObjectLength } from "../utils/commonFunction";
import { useGetError } from "../form/hooks/useError";

const InputField = ({ fieldData,cusStyle }) => {
  const dispatch = useDispatch();
  const {error,handleError} = useGetError()
  const {
    label,
    type,
    id,
    name,
    data,
    placeholder,
    disable:disabled,
    variant,
    updateData,
    currQuestion,
    opIndex,
    ansIndex,
    isSearch
  } = fieldData || {};
  const fieldAttribute = {
    label,
    type,
    name,
    id,
    disabled,
    value: data?.[name],
    placeholder: placeholder || label,
    variant: variant || "outlined",
    InputLabelProps:{ shrink: true }
  };

  return (
    <div className={`flex flex-col gap-2 w-[250px] mt-[10px] ${cusStyle}`}>
      <TextField
        {...fieldAttribute}
        onChange={(e) => {
          const { name, value } = e?.target || {};
          let Data = {
            name,
            value,
            queIndex: currQuestion,
            opIndex,
            ans: data?.[id],
            ansIndex,
          };
          if(updateData){
            updateData(Data)
          }
          if(isSearch){
            dispatch(updateData(Data))
          }
          (hasObjectLength(error) && dispatch(handleError({})))
        }}
      />
      {error?.[name] && (
        <span className="text-red-500 text-sm">{error?.[name]}</span>
      )}
    </div>
  );
};

export default InputField;


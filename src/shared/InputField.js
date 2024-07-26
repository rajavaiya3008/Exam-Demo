import { TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import RadioBtn from "./RadioBtn";
import { hasObjectLength } from "../utils/commonFunction";

const InputField = ({ fieldData }) => {
  const dispatch = useDispatch();
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
    clearError,
    error,
    currQuestion,
    opIndex,
    ansIndex,
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

  if (type === "radio") {
    return <RadioBtn fieldData={fieldData} />;
  }

  return (
    <div className="flex flex-col gap-2 w-[250px] mt-[10px]">
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
            dispatch(updateData(Data))
          }
          (hasObjectLength(error) && clearError && dispatch(clearError({})))
        }}
      />
      {error?.[name] && (
        <span className="text-red-500 text-sm">{error?.[name]}</span>
      )}
    </div>
  );
};

export default InputField;


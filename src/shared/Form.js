import React from "react";
import { useLoading } from "../form/hooks/useLoading";
import InputField from "./InputField";
import Button from "./Button";
import DropDown from "./DropDown";
import { isSelect } from "../utils/commonFunction";

const Form = ({ onSubmit,formRef, fieldData, btnName, btnStyle }) => {
  const disable = useLoading();
  return (
    <>
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="mb-[10px] gap-0 flex flex-col items-center">
          {fieldData.map((field, i) => {
            return isSelect(field.type) ? (
              <DropDown fieldData={{ ...field}} key={i} />
            ) : (
              <InputField fieldData={{ ...field}} key={i} cusStyle='h-[84px]'/>
            );
          })}
        </div>
        <Button type="submit" disable={disable} cusStyle={btnStyle}>
          <span>{disable ? "Loading..." : `${btnName}`}</span>
        </Button>
      </form>
    </>
  );
};

export default Form;

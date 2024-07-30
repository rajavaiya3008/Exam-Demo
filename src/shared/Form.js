import React from "react";
import { useLoading } from "../form/hooks/useLoading";
import InputField from "./InputField";
import Button from "./Button";
import DropDown from "./DropDown";
import { handleError } from "../redux/slices/user";
import { useSelector } from "react-redux";

const Form = ({ onSubmit, fieldData, btnName, btnStyle }) => {
  const disable = useLoading();
  const error = useSelector(state => state.user.error)
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-[10px] gap-4 flex flex-col items-center">
          {fieldData.map((field, i) => {
            return field.type === "select" ? (
              <DropDown fieldData={{ ...field}} key={i} />
            ) : (
              <InputField fieldData={{ ...field}} key={i} />
            );
          })}
        </div>
        <Button type={"submit"} disable={disable} style={btnStyle}>
          <span>{disable ? "Loading..." : `${btnName}`}</span>
        </Button>
      </form>
    </>
  );
};

export default Form;

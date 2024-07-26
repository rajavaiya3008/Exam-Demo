import React from "react";
import InputField from "./InputField";
import { useForgetData } from "../form/hooks/useForgetData";
import { useLoading } from "../form/hooks/useLoading";
import Button from "./Button";


const ForgetPassword = () => {
  const { fieldData, sendMail } = useForgetData();
  const disable = useLoading();

  return (
    <>
      <div className="flex items-center flex-col mt-[70px]">
        <p className="text-center mb-4 text-4xl">Forget Password</p>
        <InputField fieldData={fieldData} />
        <Button onSubmit={sendMail} disable={disable} style={`mt-[10px]`}>
          <span>{disable ? "Loading..." : "Submit"}</span>
        </Button>
      </div>
    </>
  );
};

export default ForgetPassword;

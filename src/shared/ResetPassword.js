import React from "react";
import { useResetPassword } from "../form/hooks/useResetPassword";
import Form from "./Form";
import Button from "./Button";

const ResetPassword = () => {
  const { ResetPasswordFields,resetPass, handleReset,clearPass } = useResetPassword();

  return (
    <div className="flex items-center flex-col mt-[70px]">
      <p className="text-center mb-4 text-4xl">Reset Password</p>
      <Form onSubmit={handleReset} formRef={resetPass} fieldData={ResetPasswordFields} btnName='Reset' btnStyle='mt-[10px] ml-[30px]'/>
      <Button onSubmit={clearPass} cusStyle='ml-[51%] mt-[-36px]'>
        Clear
      </Button>
    </div>
  );
};

export default ResetPassword;

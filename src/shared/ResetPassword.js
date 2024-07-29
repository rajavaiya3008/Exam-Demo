import React from "react";
import { useResetPassword } from "../form/hooks/useResetPassword";
import Form from "./Form";

const ResetPassword = () => {
  const { ResetPasswordFields, handleReset } = useResetPassword();

  return (
    <div className="flex items-center flex-col mt-[70px]">
      <p className="text-center mb-4 text-4xl">Reset Password</p>
      <Form onSubmit={handleReset} fieldData={ResetPasswordFields} btnName={'Reset'} btnStyle={`mt-[10px]`}/>
    </div>
  );
};

export default ResetPassword;

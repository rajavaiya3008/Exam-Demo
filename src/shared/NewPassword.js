import React from "react";
import { useNewPassword } from "../form/hooks/useNewPassword";
import Form from "./Form";

const NewPassword = () => {
  const { createNewPasswordField, handleChangePassword } = useNewPassword();

  return (
    <>
      <div className="flex items-center flex-col mt-[70px]">
        <p className="text-center text-4xl mb-4">New Password</p>
        <Form onSubmit={handleChangePassword} fieldData={createNewPasswordField} btnName={'Submit'} btnStyle={`mt-[10px]`}/>
      </div>
    </>
  );
};

export default NewPassword;

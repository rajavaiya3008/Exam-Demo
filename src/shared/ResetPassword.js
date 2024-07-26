import React from "react";
import InputField from "./InputField";
import { useResetPassword } from "../form/hooks/useResetPassword";
import { useLoading } from "../form/hooks/useLoading";
import Button from "./Button";

const ResetPassword = () => {
  const { ResetPasswordFields, handleReset, handleCancel } = useResetPassword();
  const disable = useLoading()

  return (
    <div className="flex items-center flex-col mt-[70px]">
      <p className="text-center mb-4 text-4xl">Reset Password</p>

      {ResetPasswordFields.map((field, i) => (
        <InputField fieldData={field} key={i} />
      ))}

      <div className="flex gap-2">
        <Button onSubmit={handleReset} disable={disable} style={'mt-[10px]'}>
          <span>{disable ? "Loading..." : "Reset"}</span>
        </Button>
        <Button onSubmit={handleCancel} style={'mt-[10px]'}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;

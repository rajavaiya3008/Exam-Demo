import React from "react";
import InputField from "./InputField";
import { useResetPassword } from "../form/hooks/useResetPassword";
import { useLoading } from "../form/hooks/useLoading";
import Button from "./Button";

const ResetPassword = () => {
  const { ResetPasswordFields, handleReset } = useResetPassword();
  const disable = useLoading();

  return (
    <div className="flex items-center flex-col mt-[70px]">
      <p className="text-center mb-4 text-4xl">Reset Password</p>

      <form onSubmit={handleReset}>
        {ResetPasswordFields.map((field, i) => (
          <InputField fieldData={field} key={i} />
        ))}

        <div className="flex gap-2">
          <Button type={'submit'} disable={disable} style={"mt-[10px]"}>
            <span>{disable ? "Loading..." : "Reset"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

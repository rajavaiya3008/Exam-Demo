import React from "react";
import InputField from "./InputField";
import { useNewPassword } from "../form/hooks/useNewPassword";
import Button from "./Button";
import { useLoading } from "../form/hooks/useLoading";

const NewPassword = () => {
  const { createNewPasswordField, handleChangePassword } = useNewPassword();
  const disable = useLoading();

  return (
    <>
      <div className="flex items-center flex-col mt-[70px]">
        <p className="text-center text-4xl mb-4">New Password</p>
        <form onSubmit={handleChangePassword}>
          {createNewPasswordField.map((field, i) => (
            <InputField fieldData={field} key={i} />
          ))}
          <Button
            type={'submit'}
            disable={disable}
            style={"mt-[10px]"}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPassword;

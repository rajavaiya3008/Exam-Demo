import React from "react";
import { useForgetData } from "../../form/hooks/useForgetData";
import Form from "../../shared/Form";


const ForgetPassword = () => {
  const { fieldData, sendMail } = useForgetData();

  return (
    <>
      <div className="flex items-center flex-col mt-[70px]">
        <p className="text-center mb-4 text-4xl">Forget Password</p>
        <Form onSubmit={sendMail} fieldData={fieldData} btnName='Submit' btnStyle='mt-[10px]'/>
      </div>
    </>
  );
};

export default ForgetPassword;

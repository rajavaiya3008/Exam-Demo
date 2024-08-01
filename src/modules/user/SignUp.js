import React from "react";
import { Link } from "react-router-dom";
import { useSignupData } from "../../form/hooks/useSignupData";
import { LOGIN_PAGE } from "../../utils/routeConstant";
import Form from "../../shared/Form";

const SignUp = () => {
  const { signupField, handleSignup } = useSignupData();

  return (
    <div className="w-[100vw] flex justify-center has-[660px]:mb-[50px]">
      <div className="border border-black h-[650px] w-[320px] max-[360px]:w-[290px] mt-[70px] flex flex-col justify-center gap-[15px] mb-[10px] rounded-lg">
        <h1 className="text-2xl text-center mt-[10px] font-semibold">
          SignUp Here
        </h1>

        <Form
          onSubmit={handleSignup}
          fieldData={signupField}
          btnName="Signup"
          btnStyle="w-[254px] mt-[30px]"
        />

        <div className="text-center">
          <p>
            Do You have an Account?
            <Link to={LOGIN_PAGE} className="text-[#7747ff] ml-4">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

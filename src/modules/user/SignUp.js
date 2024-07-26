import React from "react";
import InputField from "../../shared/InputField";
import { handleSignupData } from "../../redux/slices/user";
import DropDown from "../../shared/DropDown";
import { Link } from "react-router-dom";
import { useSignupData } from "../../form/hooks/useSignupData";
import { LOGIN_PAGE } from "../../utils/routeConstant";
import { useLoading } from "../../form/hooks/useLoading";
import Button from "../../shared/Button";
const dropDownOptions = ["student", "teacher"];

const SignUp = () => {
  const { signupField, signupData, handleSignup } = useSignupData();
  const disable = useLoading()

  return (
    <div className="w-[100vw] flex justify-center has-[660px]:mb-[50px]">
      <div className="border border-black h-[550px] w-[320px] max-[360px]:w-[290px] mt-[70px] flex flex-col justify-center gap-[15px] mb-[10px] rounded-lg">
        <h1 className="text-2xl text-center mt-[10px] font-semibold">
          SignUp Here
        </h1>

        <div className="flex flex-col items-center">
          {signupField.map((field, i) => (
            <InputField fieldData={field} key={i} />
          ))}
        </div>

        <DropDown
          dropDownOptions={dropDownOptions}
          name={"role"}
          updateData={handleSignupData}
          signupData={signupData}
        />

        <Button onSubmit={handleSignup} disable={disable} style={'w-[270px]'}>
          <span>{disable ? "Loading..." : "Sign Up"}</span>
        </Button>

        <div className="text-center">
          <p>
            Do You have an Account?
            <Link to={LOGIN_PAGE} className="text-[#7747ff]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

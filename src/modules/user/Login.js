import React from "react";
import { Link } from "react-router-dom";
import { useLoginData } from "../../form/hooks/useLoginData";
import { FORGET_PASSWORD, SIGNUP_PAGE } from "../../utils/routeConstant";
import Form from "../../shared/Form";

const Login = () => {
  const { loginField, handleSubmit } = useLoginData();

  return (
    <>
      <div className="w-[100vw] flex justify-center">
        <div className="border relative h-[400px] w-[320px] max-[360px]:w-[290px] mt-[70px] flex flex-col justify-center gap-[20px] mb-[10px] rounded-lg border-black login-container">
          <h1 className="text-2xl mt-[10px] font-semibold text-center">
            Login Here
          </h1>

          <Form
            onSubmit={handleSubmit}
            fieldData={loginField}
            btnName="Login"
            btnStyle="w-[254px] mt-[30px]"
          />

          <div className="absolute bottom-[110px] right-[34px]">
            <p>
              <Link to={FORGET_PASSWORD} className="text-[#7747ff]">
                forget password?
              </Link>
            </p>
          </div>

          <div className="text-center">
            <p>
              Don't have an account yet?
              <Link to={SIGNUP_PAGE} className="text-[#7747ff] ml-1">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

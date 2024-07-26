import React from "react";
import InputField from "../../shared/InputField";
import { Link } from "react-router-dom";
import { useLoginData } from "../../form/hooks/useLoginData";
import { FORGET_PASSWORD, SIGNUP_PAGE } from "../../utils/routeConstant";
import { useLoading } from "../../form/hooks/useLoading";
import Button from "../../shared/Button";

const Login = () => {
  const { loginField, handleSubmit } = useLoginData();
  const disable = useLoading();

  return (
    <>
      <div className="w-[100vw] flex justify-center">
        <div className="border h-[400px] w-[320px] max-[360px]:w-[290px] mt-[70px] flex flex-col justify-center gap-[20px] mb-[10px] rounded-lg border-black login-container">
          <h1 className="text-2xl mt-[10px] font-semibold text-center">
            Login Here
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-[10px] relative gap-4 flex flex-col items-center">
              {loginField.map((field, i) => (
                <InputField fieldData={field} key={i} />
              ))}
              <div className="absolute bottom-[-25px] right-[45px]">
                <p>
                  <Link to={FORGET_PASSWORD} className="text-[#7747ff]">
                    forget password?
                  </Link>
                </p>
              </div>
            </div>

            <Button
              type={'submit'}
              disable={disable}
              style={"w-[270px] mt-[30px]"}
            >
              <span>{disable ? "Loading..." : "Login"}</span>
            </Button>
          </form>

          <div className="text-center">
            <p>
              Don't have an account yet?
              <Link to={SIGNUP_PAGE} className="text-[#7747ff]">
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

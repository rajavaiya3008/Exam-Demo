import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getCurrUserData } from "../utils/currentUser";
import { useDispatch, useSelector } from "react-redux";
import { handleMenu } from "../redux/slices/user";
import { TbMenu2 } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import {
  HOME_PAGE,
  LOGIN_PAGE,
  SIGNUP_PAGE,
  STUDENT_DASHBOARD,
  TEACHER_DASHBOARD,
} from "../utils/routeConstant";
import { isStudent } from "../utils/commonFunction";
import Button from "./Button";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { role } = getCurrUserData();
  const menu = useSelector((state) => state.user.menu);
  const loginBtn = location.pathname !== LOGIN_PAGE;
  const signupBtn = location.pathname !== SIGNUP_PAGE;
  const dashboardBtn = location.pathname === HOME_PAGE && role;
  const menuBtn = role && location.pathname !== HOME_PAGE;

  const headerBtn = [
    {
      path: LOGIN_PAGE,
      visible: !role && loginBtn,
      text: "Login",
      style:
        "border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white",
    },
    {
      path: SIGNUP_PAGE,
      visible: !role && signupBtn,
      text: "Signup",
      style:
        "w-max ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white",
    },
    {
      path: isStudent ? STUDENT_DASHBOARD : TEACHER_DASHBOARD,
      visible: role && dashboardBtn,
      text: "Dashboard",
      style:
        "ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white",
    },
  ];

  return (
    <div className="h-[50px] text-gray-200 flex justify-between">
      <div className="ml-[10px] gap-[10px] flex justify-center items-center">
        {menuBtn && (
          <Button
            onSubmit={() => dispatch(handleMenu())}
            customStyle={"menu-btn"}
          >
            {menu ? (
              <IoCloseSharp style={{ fontSize: 25 }} />
            ) : (
              <TbMenu2 style={{ fontSize: 25 }} />
            )}
          </Button>
        )}
        <p className="text-4xl">Exam</p>
      </div>

      <div className="mr-[30px] flex justify-center items-center">
        {headerBtn.map(
          (btn, i) =>
            btn.visible && (
              <NavLink to={btn.path} className={btn.style} key={i}>
                {btn.text}
              </NavLink>
            )
        )}
      </div>
    </div>
  );
};

export default Header;

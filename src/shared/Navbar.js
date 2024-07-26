import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrUserData } from "../utils/currentUser";
import { useDispatch } from "react-redux";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { handleMenu } from "../redux/slices/user";
import { loadViewExamData } from "../redux/slices/teacher";
import { loadAllExamData } from "../redux/slices/student";
import { clearLocalStorageItem } from "../utils/localStorageFunction";
import { LOGIN_PAGE, STUDENT_RESET_PASS, TEACHER_RESET_PASS } from "../utils/routeConstant";
import Button from "./Button";

const Navbar = ({ navItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { role: currUserRole } = getCurrUserData();
  const isStudent = currUserRole === 'student'

  const handleLogout = () => {
    clearLocalStorageItem();
    dispatch(loadViewExamData([]));
    dispatch(loadAllExamData([]));
    navigate(LOGIN_PAGE, { replace: true });
  };

  return (
    <div
      className="w-[100%] h-[100%] bg-gray-800 bg-opacity-90 fixed"
      onClick={() => dispatch(handleMenu())}
    >
      <div
        className="w-[200px] h-[100%] overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="space-y-2 font-medium">
          {navItems.map((item, i) => (
            <li key={i} onClick={() => dispatch(handleMenu())}>
              <NavLink
                to={item.path}
                className={`flex gap-[20px] text-[20px] items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}
          <li onClick={() => dispatch(handleMenu())}>
            <NavLink
              to={isStudent? STUDENT_RESET_PASS : TEACHER_RESET_PASS}
              className="flex gap-[20px] text-[20px] items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <RiLockPasswordFill style={{ fontSize: 25 }} /> Reset
            </NavLink>
          </li>
          <li onClick={() => dispatch(handleMenu())}>
            <Button onSubmit={handleLogout} customStyle={"flex gap-[20px] text-[20px] items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"}>
              <TbLogout style={{ fontSize: 25 }} /> Logout
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect } from "react";
import Navbar from "../../shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { PiExamFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  ALL_EXAM,
  STUDENT_DASHBOARD,
  STUDENT_PROFILE,
} from "../../utils/routeConstant";
import { removeLocalStorageItem } from "../../utils/localStorageFunction";
import { PAGE_NO } from "../../utils/localStorageConstant";
import { loadAllExamData } from "../../redux/slices/student";

const studentRoutes = [
  {
    path: STUDENT_DASHBOARD,
    name: "Dashboard",
    icon: <RiDashboardHorizontalFill style={{ fontSize: 25 }} />,
  },
  {
    path: ALL_EXAM,
    name: "Exams",
    icon: <PiExamFill style={{ fontSize: 25 }} />,
  },
  {
    path: STUDENT_PROFILE,
    name: "Profile",
    icon: <CgProfile style={{ fontSize: 25 }} />,
  },
];

const Student = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const menu = useSelector((state) => state.user.menu);

  useEffect(() => {
    const allExam = location.pathname.split("/")[1];
    if(allExam !== "all-exam"){
      dispatch(loadAllExamData([]))
      removeLocalStorageItem(PAGE_NO)
    }
  });

  return (
    <div className="flex h-[100%] w-[100vw]">
      <div
        className={`w-[100%] z-10 fixed h-[100%] mt-[50px] overflow-scroll ${
          menu ? "show-menu" : "hide-menu"
        }`}
      >
        <Navbar navItems={studentRoutes} />
      </div>
      <div className="w-full overflow-auto mb-[20px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Student;

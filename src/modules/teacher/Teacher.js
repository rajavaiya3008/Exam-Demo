import React from "react";
import Navbar from "../../shared/Navbar";
import { Outlet } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { PiExamFill } from "react-icons/pi";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  ALL_STUDENT,
  CREATE_EXAM,
  TEACHER_DASHBOARD,
  VIEW_EXAM,
} from "../../utils/routeConstant";

const Teacher = () => {
  const menu = useSelector((state) => state.user.menu);
  const teacherRoutes = [
    {
      path: TEACHER_DASHBOARD,
      name: "Dashboard",
      icon: <RiDashboardHorizontalFill style={{ fontSize: 25 }} />,
    },
    {
      path: ALL_STUDENT,
      name: "All Students",
      icon: <PiStudentFill style={{ fontSize: 25 }} />,
    },
    {
      path: CREATE_EXAM,
      name: "CreateExam",
      icon: <PiExamFill style={{ fontSize: 25 }} />,
    },
    {
      path: VIEW_EXAM,
      name: "View Exam",
      icon: <PiExamFill style={{ fontSize: 25 }} />,
    },
  ];

  return (
    <div className="flex h-[100%] w-[100vw]">
      <div
        className={`w-[100%] z-10 fixed h-[100%] top-[50px] overflow-scroll ${
          menu ? "show-menu" : "hide-menu"
        }`}
      >
        <Navbar navItems={teacherRoutes} />
      </div>
      <div className="w-full mb-[20px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Teacher;

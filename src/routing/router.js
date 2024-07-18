import App from "../App";
import ErrorPage from "../shared/ErrorPage";
import ForgetPassword from "../shared/ForgetPassword";
import Home from "../shared/Home";
import NewPassword from "../shared/NewPassword";
import ResetPassword from "../shared/ResetPassword";
import Auth from "../modules/auth/Auth";
import Student from "../modules/student/Student";
import AllExam from "../modules/student/childroutes/AllExam";
import GiveExam from "../modules/student/childroutes/GiveExam";
import ShowResult from "../modules/student/childroutes/ShowResult";
import StudentDashboard from "../modules/student/childroutes/StudentDashboard";
import StudentProfile from "../modules/student/childroutes/StudentProfile";
import Teacher from "../modules/teacher/Teacher";
import AllStudent from "../modules/teacher/childroutes/AllStudent";
import CreateExam from "../modules/teacher/childroutes/CreateExam";
import EditExam from "../modules/teacher/childroutes/EditExam";
import TeacherDashbord from "../modules/teacher/childroutes/TeacherDashbord";
import VerifiedStudent from "../modules/teacher/childroutes/VerifiedStudent";
import ViewExam from "../modules/teacher/childroutes/ViewExam";
import ViewStudentDetail from "../modules/teacher/childroutes/ViewStudentDetail";
import Login from "../modules/user/Login";
import SignUp from "../modules/user/SignUp";
import { ALL_EXAM, ALL_STUDENT, CREATE_EXAM, EDIT_EXAM, FORGET_PASSWORD, GIVE_EXAM, HOME_PAGE, LOGIN_PAGE, NEW_PASSWORD, SHOW_RESULT, SIGNUP_PAGE, STUDENT, STUDENT_DASHBOARD, STUDENT_DETAIL, STUDENT_PROFILE, TEACHER, TEACHER_DASHBOARD, VERIFIED_STUDENT, VIEW_EXAM } from "../utils/constant";


export const allRouter = [
    {
      path:HOME_PAGE,
      errorElement:<ErrorPage />,
      element:<App />,
      children:[
        {
            index:true,
            element:<Home />
        },
        {
          path:LOGIN_PAGE,
          element:<Login />
        },
        {
          path:SIGNUP_PAGE,
          element:<SignUp />
        },
        {
          path:FORGET_PASSWORD,
          element:<ForgetPassword />
        },
        {
          path:NEW_PASSWORD,
          element:<NewPassword />
        },
        {
          element:<Auth role={["teacher"]}/>,
          children:[
            {
              path:TEACHER,
              element:<Teacher />,
              children:[
                {
                  path:TEACHER_DASHBOARD,
                  element:<TeacherDashbord />
                },
                {
                  // index:true,
                  path:ALL_STUDENT,
                  element:<AllStudent />
                },
                {
                  path:VERIFIED_STUDENT,
                  element:<VerifiedStudent />
                },
                {
                  path:STUDENT_DETAIL,
                  element:<ViewStudentDetail />
                },
                {
                  path:CREATE_EXAM,
                  element:<CreateExam />
                },
                {
                  path:VIEW_EXAM,
                  element:<ViewExam />
                },
                {
                  path:EDIT_EXAM,
                  element:<EditExam />
                },
                {
                  path:'reset-password',
                  element:<ResetPassword />
                },
              ]
            }
          ]
        },
        {
          element:<Auth role={['student']}/>,
          children:[
            {
              path:STUDENT,
              element:<Student />,
              children:[
                {
                  path:STUDENT_DASHBOARD,
                  element:<StudentDashboard />
                },
                {
                  path:ALL_EXAM,
                  element:<AllExam />
                },
                {
                  path:GIVE_EXAM,
                  element:<GiveExam />
                },
                {
                  path:STUDENT_PROFILE,
                  element:<StudentProfile />
                },
                {
                  path:'reset-password',
                  element:<ResetPassword />
                },
                {
                  path:SHOW_RESULT,
                  element:<ShowResult />
                }
              ]
            }
          ]
        }
      ]
    }
  ]
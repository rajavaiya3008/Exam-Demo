import App from "../App";
import ErrorPage from "../components/ErrorPage";
import ForgetPassword from "../components/ForgetPassword";
import Home from "../components/Home";
import NewPassword from "../components/NewPassword";
import ResetPassword from "../components/ResetPassword";
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


export const allRouter = [
    {
      path:'/',
      errorElement:<ErrorPage />,
      element:<App />,
      children:[
        {
            index:true,
            element:<Home />
        },
        {
          path:'login',
          element:<Login />
        },
        {
          path:'signup',
          element:<SignUp />
        },
        {
          path:'forget-password',
          element:<ForgetPassword />
        },
        {
          path:'newPassword',
          element:<NewPassword />
        },
        {
          element:<Auth role={["teacher"]}/>,
          children:[
            {
              path:'teacher',
              element:<Teacher />,
              children:[
                {
                  path:'dashboard',
                  element:<TeacherDashbord />
                },
                {
                  // index:true,
                  path:'allstudent',
                  element:<AllStudent />
                },
                {
                  path:'verified-student',
                  element:<VerifiedStudent />
                },
                {
                  path:'view-student-detail',
                  element:<ViewStudentDetail />
                },
                {
                  path:'create-exam',
                  element:<CreateExam />
                },
                {
                  path:'view-exam',
                  element:<ViewExam />
                },
                {
                  path:'edit-exam',
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
              path:'student',
              element:<Student />,
              children:[
                {
                  path:'dashboard',
                  element:<StudentDashboard />
                },
                {
                  path:'all-exam',
                  element:<AllExam />
                },
                {
                  path:'give-exam',
                  element:<GiveExam />
                },
                {
                  path:'student-profile',
                  element:<StudentProfile />
                },
                {
                  path:'reset-password',
                  element:<ResetPassword />
                },
                {
                  path:'show-result',
                  element:<ShowResult />
                }
              ]
            }
          ]
        }
      ]
    }
  ]
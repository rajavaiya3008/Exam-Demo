import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './modules/user/Login';
import SignUp from './modules/user/SignUp';
import Auth from './modules/auth/Auth';
import Teacher from './modules/teacher/Teacher';
import Student from './modules/student/Student';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store/store';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import AllStudent from './modules/teacher/childroutes/AllStudent';
import VerifiedStudent from './modules/teacher/childroutes/VerifiedStudent';
import CreateExam from './modules/teacher/childroutes/CreateExam';
import ViewExam from './modules/teacher/childroutes/ViewExam';
import TeacherDashbord from './modules/teacher/childroutes/TeacherDashbord';
import ViewStudentDetail from './modules/teacher/childroutes/ViewStudentDetail';
import EditExam from './modules/teacher/childroutes/EditExam';
import StudentDashboard from './modules/student/childroutes/StudentDashboard';
import AllExam from './modules/student/childroutes/AllExam';
import GiveExam from './modules/student/childroutes/GiveExam';
import StudentProfile from './modules/student/childroutes/StudentProfile';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import NewPassword from './components/NewPassword';
import ShowResult from './modules/student/childroutes/ShowResult';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
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
                index:true,
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
                index:true,
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
])



root.render(
  <>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <ToastContainer />
    </Provider>
  </>
);


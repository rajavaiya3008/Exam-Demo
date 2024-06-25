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

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/login',
        element:<Login />
      },
      {
        path:'/signup',
        element:<SignUp />
      },
      {
        element:<Auth role={["teacher"]}/>,
        children:[
          {
            path:'/teacher',
            element:<Teacher />
          }
        ]
      },
      {
        element:<Auth role={['student']}/>,
        children:[
          {
            path:'/student',
            element:<Student />
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


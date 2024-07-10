import React from 'react'
import { useNavigate } from 'react-router'

const ErrorPage = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }


  return (
    <div className='h-[100vh] flex justify-center items-center'>
        <div>
            <p className='text-lg'>Opps! Something went Wrong!</p>
            <button 
            onClick={handleBack}
            className="bg-blue-500 mt-[20px] ml-[82px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Back</button>
        </div>
    </div>
  )
}

export default ErrorPage
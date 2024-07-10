import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../../../components/Pagination';

const ShowResult = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const result = location.state;

    const keys = ['subjectName','rank','score','resultStatus'];

    const handleBack = () => {
        navigate(-1);
    }

  return (
    <div className='h-[100vh] flex items-center flex-col mt-[30px]'>
      <p className='text-center text-4xl mb-4'>Results</p>
        <Pagination data={result} keys={keys}/>
        <button 
        onClick={handleBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 mt-[40px]"
        >Back</button>
    </div>
  )
}

export default ShowResult
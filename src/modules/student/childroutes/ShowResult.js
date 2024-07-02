import React from 'react'
import { useLocation } from 'react-router-dom'
import Pagination from '../../../components/Pagination';

const ShowResult = () => {

    const location = useLocation();
    console.log('location', location);

    const result = location.state;

    const keys = ['subjectName','rank','score','resultStatus'];

  return (
    <div className='h-[100vh] flex items-center justify-center bg-gray-500'>
        <Pagination data={result} keys={keys}/>
    </div>
  )
}

export default ShowResult
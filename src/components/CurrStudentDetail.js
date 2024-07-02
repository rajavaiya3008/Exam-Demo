import React from 'react'
import Pagination from './Pagination'
import { useSelector } from 'react-redux'

const CurrStudentDetail = () => {

    const currStudentDetail = useSelector(state => state.teacher.currStudentDetail)

    const keys = ['subjectName','rank','score','resultStatus']
    console.log('result', currStudentDetail?.Result?.length)
    console.log('name', currStudentDetail.name)
    console.log('currStudentDetail', currStudentDetail)


  return (
    <div className='flex flex-col text-gray-300 text-xl'>
        <pre className='text-center'>Name: {currStudentDetail.name}</pre> <br />
        <pre className='text-center'>Email: {currStudentDetail.email}</pre> <br />

        <div>
          <pre className='text-center'>Result:</pre>
            {
                currStudentDetail?.Result?.length > 0 ? 
                <Pagination data={currStudentDetail.Result} keys={keys}/> :
                        <pre className='text-center'>Result Not found</pre>
            }
        </div>

    </div>
  )
}

export default CurrStudentDetail
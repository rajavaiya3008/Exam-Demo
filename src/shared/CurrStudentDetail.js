import React from 'react'
import Pagination from './Pagination'
import { useSelector } from 'react-redux'

const CurrStudentDetail = () => {

    const currStudentDetail = useSelector(state => state.teacher.currStudentDetail)

    const keys = ['subjectName','rank','score','resultStatus']


  return (
    <div className='flex flex-col text-xl max-[350px]:text-lg'>
        <pre className='text-center'>Name: {currStudentDetail.name}</pre> <br />
        <pre className='text-center'>Email: {currStudentDetail.email}</pre> <br />

        <div className='max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[600px]:w-[540px] max-[530px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px]'>
          <pre className='text-center'>Result</pre>
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
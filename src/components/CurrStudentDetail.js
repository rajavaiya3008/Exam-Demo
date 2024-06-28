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
    <div>
        Name: <span>{currStudentDetail.name}</span> <br />
        Email: <span>{currStudentDetail.email}</span> <br />

        <div>
            Result: {
                currStudentDetail?.Result?.length > 0 ? 
                <Pagination data={currStudentDetail.Result} keys={keys} viewPath={''}/> :
                        <span>Result Not found</span>
            }
        </div>

    </div>
  )
}

export default CurrStudentDetail
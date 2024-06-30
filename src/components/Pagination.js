import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Pagination = ({data,keys,viewPath,btn}) => {

    let recordsPerPage = 10;
    let totalPage = Math.ceil(data?.length/recordsPerPage);
    console.log('totalPage', totalPage)

    const [currPage,setCurrPage] = useState(1);
    const indexOfLastRecord = currPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const sliceData = data?.filter((item,i) => i >= indexOfFirstRecord && i < indexOfLastRecord);

    const handlePrevPage = () => {
        if(currPage === 1){
            setCurrPage(totalPage);
        }else{
            setCurrPage(currPage-1)
        }
    }

    const handleNextPage = () => {
        if(currPage === totalPage){
            setCurrPage(1);
        }else{
            setCurrPage(currPage+1)
        }
    }

  return (
    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <td className="px-6 py-3">Sr No.</td>
                    {
                        keys.map((tuple,i) => <td key={i} className="px-6 py-3">{keys[i]}</td>)
                    }
                    {
                        viewPath !== undefined ? <td className="px-6 py-3">View</td> : ''
                    }
                    {
                        btn?.editBtn !== undefined ? <td className="px-6 py-3">Edit</td> : ''
                    }
                    {
                        btn?.giveExamBtn !== undefined ? <td className="px-6 py-3">Give</td> : ''
                    }
                </tr>
            </thead>

            <tbody>
                {
                    sliceData?.map((item,i) => (
                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-3">{i+1}</td>
                            {
                                keys?.map((tuple,i) => <td key={i} className="px-6 py-3">{item[keys[i]]}</td>)
                            }
                            {
                                viewPath !== undefined ? <td className="px-6 py-3"><NavLink to={`${viewPath}?id=${item._id}`}>View</NavLink></td> : ''
                            }
                            {
                                btn?.editBtn !== undefined ? <td className="px-6 py-3"><NavLink to={`${btn.editBtn}?id=${item._id}&subject=${item.subjectName}`}>Edit</NavLink></td> : ''
                            } 
                            {
                                btn?.giveExamBtn !== undefined ? <td className="px-6 py-3"><NavLink to={`${btn.giveExamBtn}?id=${item._id}&subject=${item.subjectName}`}>Give</NavLink></td> : ''
                            }
                        </tr>
                    ))
                }
                    <tr className='text-center'>{currPage} Out of {totalPage}</tr>
            </tbody>
        </table>

        <div className='fixed left-[50%] flex'>
            <button 
            onClick={handlePrevPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >{`<`}</button>
            <span className='flex items-center'>{currPage}</span>
            <button 
            onClick={handleNextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >{`>`}</button>
        </div>
    </div>
  )
}

export default Pagination
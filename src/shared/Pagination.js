import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import InputField from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import { handlePrevVisitedPage } from '../redux-toolkit/slices/user';

const Pagination = ({data,keys,viewPath,btn,searchKey,searchVal,lastVisitedPage}) => {

    const dispatch = useDispatch();
    const [currPage,setCurrPage] = useState(lastVisitedPage || 1);
    

    useEffect(() => {
        if( searchVal !== undefined && searchVal !== ''){
            setCurrPage(1);
        }
    },[searchVal])

    if(searchVal?.trim() !== '' && searchVal?.trim()!== undefined){
        searchVal.toLowerCase();
        data = data.filter((item,i) => item?.[searchKey[0]].toLowerCase()?.includes(searchVal) || item?.[searchKey[1]]?.toLowerCase()?.includes(searchVal) || (searchKey[2] && item?.[searchKey[2]].toLowerCase()?.includes(searchVal)))
    }

    let recordsPerPage = 10;
    let totalPage = Math.ceil(data?.length/recordsPerPage);

    const indexOfLastRecord = currPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    let sliceData;

    ( sliceData = data?.filter((item,i) => i >= indexOfFirstRecord && i < indexOfLastRecord))

    const handlePrevPage = () => {
        dispatch(handlePrevVisitedPage(currPage-1))
        setCurrPage(currPage-1)
    }

    const handleNextPage = () => {
        dispatch(handlePrevVisitedPage(currPage+1));
        setCurrPage(currPage+1)
    }

  return (
    <div className="relative overflow-x-auto dark:bg-gray-800">

        <table className="w-[850px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 pagination">

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <td className="px-6 py-3">Sr No.</td>
                    {
                        keys.map((key,i) => <td key={i} className="px-6 py-3">{key}</td>)
                    }
                    {
                        viewPath !== undefined ? <td className="px-6 py-3">Action</td> : ''
                    }
                    {
                        btn?.editBtn !== undefined ? <td className="px-6 py-3">Action</td> : ''
                    }
                    {
                        btn?.giveExamBtn !== undefined ? <td className="px-6 py-3">Action</td> : ''
                    }
                </tr>
            </thead>

            <tbody className='w-[100%]'>
                {
                    sliceData?.map((item,i) => (
                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-3">{i+1}</td>
                            {
                                keys?.map((tuple,i) => <td key={i} className="px-6 py-3">{item[keys[i]]}</td>)
                            }
                            {
                                viewPath !== undefined ? <td className="px-6 py-3 text-blue-500"><NavLink to={`${viewPath}?id=${item._id}`}>View</NavLink></td> : ''
                            }
                            {
                                btn?.editBtn !== undefined ? <td className="px-6 py-3 text-blue-500"><NavLink to={`${btn.editBtn}?id=${item._id}&subject=${item.subjectName}`}>Edit</NavLink></td> : ''
                            } 
                            {
                                item?.Result?.length > 0 ? 
                                (<td className="px-6 py-3 text-blue-200"><NavLink to={`${btn.showResultBtn}?id=${item._id}`} state={item.Result}>Result</NavLink></td>) :
                                (btn?.giveExamBtn !== undefined ? <td className="px-6 py-3 text-blue-500"><NavLink to={`${btn.giveExamBtn}?id=${item._id}&subject=${item.subjectName}`}>Give</NavLink></td> : '')
                            }
                        </tr>
                    ))
                }
            </tbody>

        </table>
        
        {
            data.length > 10 && 
        <div className='text-white flex w-[850px] gap-[50px] px-[5px] mt-[20px] mb-[10px]'>
            <pre className='mt-[8px] w-[116px]'>{currPage} Out of {totalPage}</pre>
            <div className='flex gap-2 pb-2'>
                <button 
                disabled={currPage === 1}
                onClick={handlePrevPage}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-full ${currPage === 1?'opacity-50 cursor-not-allowed':''}`}
                >{`<`}</button>
                <span className='flex items-center justify-center w-[17px]'>{currPage}</span>
                <button
                disabled={currPage === totalPage} 
                onClick={handleNextPage}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-full ${currPage === totalPage?'opacity-50 cursor-not-allowed':''}`}
                >{`>`}</button>
            </div>
        </div>
        }
    </div>
  )
}

export default Pagination
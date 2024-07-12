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
        // if(currPage === 1){
        //     setCurrPage(prevVisitedPage)
        // }
        // return () => {
        //     dispatch(handlePrevVisitedPage(currPage));
        // }
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

        {/* <InputField searchField={searchField}/> */}

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
        <div className='fixed flex w-[850px] justify-between pagination mt-[20px] paging'>
            <pre className=''>{currPage} Out of {totalPage}</pre>
            <div className='flex gap-2 move-btn'>
                <button 
                disabled={currPage === 1}
                onClick={handlePrevPage}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-full ${currPage === 1?'opacity-50 cursor-not-allowed':''}`}
                >{`<`}</button>
                <span className='flex items-center'>{currPage}</span>
                <button
                disabled={currPage === totalPage} 
                onClick={handleNextPage}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-full ${currPage === totalPage?'opacity-50 cursor-not-allowed':''}`}
                >{`>`}</button>
            </div>
        </div>
        }
        {/* <div className='fixed flex w-[850px] justify-between mt-[10px] pagination'>
            <pre className='text-gray-300'>{currPage} Out of {totalPage}</pre>
            <button 
            onClick={handlePrevPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline rounded-full"
            >{`<`}</button>
            <span className='flex items-center text-gray-300'>{currPage}</span>
            <button 
            onClick={handleNextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-full"
            >{`>`}</button>
        </div> */}
    </div>
  )
}

export default Pagination
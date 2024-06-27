import React, { useState } from 'react'

const Pagination = ({data}) => {

    let recordsPerPage = 10;
    let totalPage = Math.ceil(data.length/recordsPerPage);
    console.log('totalPage', totalPage)

    const [currPage,setCurrPage] = useState(1);
    const indexOfLastRecord = currPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const sliceData = data.filter((item,i) => i >= indexOfFirstRecord && i < indexOfLastRecord);

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
    <>
        <table>
            {
                sliceData.map((item,i) => (
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.status}</td>
                    </tr>
                ))
            }
        </table>

        <div>
            <button onClick={handlePrevPage}>{`<`}</button>
            <span>{currPage}</span>
            <button onClick={handleNextPage}>{`>`}</button>
        </div>
    </>
  )
}

export default Pagination
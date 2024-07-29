import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { isStudent } from "../utils/commonFunction";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageFunction";


const Pagination = ({ data, keys, btn, newBtn, searchKey, searchVal }) => {
  const page = getLocalStorageItem('pageNo')
  const [currPage, setCurrPage] = useState(page || 1);

  useEffect(() => {
    (searchVal && setCurrPage(1))
  }, [searchVal]);

  const dataFilter = () => {
    data = data.filter(
      (item) =>
        item?.[searchKey[0]]
          .toLowerCase()
          ?.includes(searchVal.trim().toLowerCase()) ||
        item?.[searchKey[1]]
          ?.toLowerCase()
          ?.includes(searchVal.trim().toLowerCase()) ||
        (searchKey[2] &&
          item?.[searchKey[2]]
            .toLowerCase()
            ?.includes(searchVal.trim().toLowerCase()))
    );
  };

  (searchVal?.trim() && dataFilter())

  let recordsPerPage = 10;
  let totalPage = Math.ceil(data?.length / recordsPerPage);

  const prevDisable = () => {
    return currPage === 1;
  };

  const nextDisable = () => {
    return currPage === totalPage;
  };

  const indexOfLastRecord = currPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  let sliceData;

  sliceData = data?.filter(
    (item, i) => i >= indexOfFirstRecord && i < indexOfLastRecord
  );

  const handlePrevPage = () => {
    setCurrPage(currPage - 1);
    setLocalStorageItem('pageNo',currPage-1)
  };

  const handleNextPage = () => {
    setCurrPage(currPage + 1);
    setLocalStorageItem('pageNo',currPage+1)
  };

  return (
    <div className="relative overflow-x-auto dark:bg-gray-800">
      <table className="w-[850px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 pagination">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <td className="px-6 py-3">Sr No.</td>
            {keys.map((key, i) => (
              <td key={i} className="px-6 py-3">
                {key}
              </td>
            ))}
            {newBtn?.map((btn, i) => (
              <td className="px-6 py-3" key={i}>
                Action
              </td>
            ))}
            {btn?.giveExamBtn && <td className="px-6 py-3">Action</td>}
          </tr>
        </thead>

        <tbody className="w-[100%]">
          {sliceData?.map((item, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-3">{i + 1}</td>
              {keys?.map((tuple, i) => (
                <td key={i} className="px-6 py-3">
                  {item[keys[i]]}
                </td>
              ))}
              {newBtn?.map((btn, i) => (
                <td className="px-6 py-3 text-blue-500" key={i}>
                  <NavLink
                    to={`${btn.path}?id=${item._id}&subject=${
                      item?.subjectName || ""
                    }`}
                  >
                    {btn.text}
                  </NavLink>
                </td>
              ))}
              {isStudent() &&
                <td className={`px-6 py-3 ${item?.Result?.length ?'text-blue-200':'text-blue-500'}`}>
                  <NavLink
                    to={`${item?.Result?.length ?btn.showResultBtn:btn?.giveExamBtn }?id=${item._id}&subject=${item.subjectName}`}
                  >
                    {item?.Result?.length ? 'Result' : 'Give'}
                  </NavLink>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>

      {data.length > 10 && (
        <div className="text-white flex w-[850px] gap-[50px] px-[5px] mt-[20px] mb-[10px]">
          <pre className="mt-[8px] w-[116px]">
            {currPage} Out of {totalPage}
          </pre>
          <div className="flex gap-2 pb-2">
            <Button
              onSubmit={handlePrevPage}
              disable={prevDisable()}
              customStyle={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-full"
              }
            >
              {`<`}
            </Button>
            <span className="flex items-center justify-center w-[17px]">
              {currPage}
            </span>
            <Button
              onSubmit={handleNextPage}
              disable={nextDisable()}
              customStyle={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-full"
              }
            >
              {`>`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;

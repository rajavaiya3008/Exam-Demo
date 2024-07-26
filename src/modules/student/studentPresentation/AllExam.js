import React from "react";
import Pagination from "../../../shared/Pagination";
import InputField from "../../../shared/InputField";
import { useAllExam } from "../studentContainer/useAllExam";
import { useLoading } from "../../../form/hooks/useLoading";
import { Outlet } from "react-router";

const AllExam = () => {
  const {
    searchField,
    btn,
    keys,
    allExamData,
    searchData,
  } = useAllExam();

  return (
    <div className="flex items-center flex-col mt-[70px] overflow-hidden all-exam">
      {!useLoading() && (
        <div className="mb-[20px] flex justify-center text-white">
          <InputField fieldData={searchField} />
        </div>
      )}
      <div className="max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] all-exam">
        {useLoading() ? (
          <div className="spinner mx-auto"></div>
        ) : (
          <div className="">
            <p className="text-center text-4xl mb-4">All Exams</p>
            <Pagination
              data={allExamData}
              keys={keys}
              btn={btn}
              searchKey={["subjectName", "email"]}
              searchVal={searchData.subjectName}
            />
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default AllExam;

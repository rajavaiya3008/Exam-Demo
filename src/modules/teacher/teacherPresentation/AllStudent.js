import React from "react";
import Pagination from "../../../shared/Pagination";
import InputField from "../../../shared/InputField";
import { useAllStudent } from "../teacherContainer/useAllStudent";
import { useLoading } from "../../../hooks/useLoading";
import { STUDENT_DETAIL } from "../../../utils/routeConstant";
import Loader from "../../../shared/Loader";

const AllStudent = () => {
  const { searchField, allStudentData, keys, searchData } = useAllStudent();

  const newBtn = [{
    path: STUDENT_DETAIL,
    text:'View'
  }];

  return (
    <div className="flex items-center flex-col mt-[70px]">
      {!useLoading() && (
        <div className="mb-[20px] text-white">
          <InputField fieldData={searchField} />
        </div>
      )}
      <div className="overflow-hidden max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] h-[100%] mb-[40px]">
        {useLoading() ? (
          <Loader loaderStyle="spinner mt-[20px] mx-auto overflow-hidden"/>
        ) : (
          <div>
            <p className="text-center text-4xl mb-4">All Students</p>
            <Pagination
              data={allStudentData}
              recodesPerPage={10}
              keys={keys}
              newBtn={newBtn}
              searchKey={["name", "email", "status"]}
              searchVal={searchData.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStudent;

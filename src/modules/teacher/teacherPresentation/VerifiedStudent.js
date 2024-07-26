import React from "react";
import Pagination from "../../../shared/Pagination";
import InputField from "../../../shared/InputField";
import { useVerifiedStudent } from "../teacherContainer/useVerifiedStudent";
import { STUDENT_DETAIL } from "../../../utils/routeConstant";
import { useLoading } from "../../../form/hooks/useLoading";

const VerifiedStudent = () => {
  const {
    searchField,
    verifiedStudentData,
    keys,
    searchData,
  } = useVerifiedStudent();

  return (
    <div className="h-[100vh] flex items-center flex-col mt-[70px]">
      {!useLoading() && (
        <div className="mb-[20px] text-white">
          <InputField fieldData={searchField} />
        </div>
      )}
      <div>
        {useLoading() ? (
          <div className="spinner mt-[250px]"></div>
        ) : (
          <div>
            <p className="text-center text-4xl mb-4">Verified Students</p>
            <Pagination
              data={verifiedStudentData}
              recodesPerPage={10}
              keys={keys}
              viewPath={STUDENT_DETAIL}
              searchKey={["name", "email", "status"]}
              searchVal={searchData.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedStudent;

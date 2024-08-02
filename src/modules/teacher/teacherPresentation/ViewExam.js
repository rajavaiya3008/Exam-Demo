import React from "react";
import Pagination from "../../../shared/Pagination";
import { useViewExam } from "../teacherContainer/useViewExam";
import { useLoading } from "../../../form/hooks/useLoading";
import Loader from "../../../shared/Loader";

const ViewExam = () => {
  const { viewExam, keys, newBtn } = useViewExam();

  return (
    <div className="flex justify-center mt-[70px]">
      <div className="overflow-hidden max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] h-[100%] mb-[40px]">
        {useLoading() ? (
          <Loader loaderStyle="spinner mt-[20px] mx-auto"/>
        ) : (
          <div>
            <p className="text-center text-4xl mb-4">View Exams</p>
            <Pagination
              data={viewExam}
              recodesPerPage={10}
              keys={keys}
              newBtn={newBtn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewExam;

import React from "react";
import CurrStudentDetail from "../../../shared/CurrStudentDetail";
import { useViewStudentDetail } from "../teacherContainer/useViewStudentDetail";
import { useLoading } from "../../../form/hooks/useLoading";
import Button from "../../../shared/Button";

const ViewStudentDetail = () => {
  const { currStudentDetail, handleBack } = useViewStudentDetail();

  return (
    <div className="flex justify-center mt-[70px] text-black">
      <div className="overflow-hidden">
        {useLoading() ? (
          <div className="spinner mt-[20px]"></div>
        ) : (
          <div>
            <p className="text-center mb-4 text-4xl">Student Detail</p>
            <CurrStudentDetail currStudentDetail={currStudentDetail} />
            <Button onSubmit={handleBack} style={'mt-[15px]'}>
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStudentDetail;
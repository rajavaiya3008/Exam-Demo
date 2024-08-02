import React from "react";
import ShowExam from "../../../shared/ShowExam";
import { useGiveExam } from "../studentContainer/useGiveExam";
import { useLoading } from "../../../form/hooks/useLoading";
import Button from "../../../shared/Button";
import Loader from "../../../shared/Loader";

const GiveExam = () => {
  const {
    createExamFields,
    currQuestion,
    examData,
    validateExamData,
    validate,
    error,
    setCurrQuestion,
    handleSubmitExam,
    handleCancel,
  } = useGiveExam();

  return (
    <div className="flex justify-center mt-[70px] overflow-hidden">
      {useLoading() ? (
        <Loader loaderStyle="spinner"/>
      ) : (
        <div>
          <p className="text-center text-4xl mb-6">Give Exam</p>
          <ShowExam
            createExamFields={createExamFields}
            setCurrQuestion={setCurrQuestion}
            currQuestion={currQuestion}
            validateExamData={validateExamData}
            totalQue={examData?.questions?.length - 1}
            validate={validate}
            error={error}
          />

          <div className="flex justify-center mt-2">
            <Button onSubmit={handleSubmitExam} cusStyle='mr-[-5px]'>
              Submit
            </Button>
            <Button onSubmit={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveExam;

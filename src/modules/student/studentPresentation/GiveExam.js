import React from "react";
import ShowExam from "../../../shared/ShowExam";
import { useGiveExam } from "../studentContainer/useGiveExam";
import { useLoading } from "../../../form/hooks/useLoading";
import Button from "../../../shared/Button";

const GiveExam = () => {
  const {
    createExamFields,
    currQuestion,
    examData,
    role,
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
        <div className="spinner"></div>
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
            role={role}
          />

          <div className="flex justify-center mt-2">
            <Button onSubmit={handleSubmitExam} style={'mr-[-5px]'}>
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

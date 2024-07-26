import React from "react";
import ShowExam from "../../../shared/ShowExam";
import { useEditExam } from "../teacherContainer/useEditExam";
import { useLoading } from "../../../form/hooks/useLoading";
import Button from "../../../shared/Button";

const EditExam = () => {
  const {
    createExamFields,
    currQuestion,
    validateExamData,
    validate,
    edited,
    error,
    setCurrQuestion,
    handleEditExam,
    handleDeleteExam,
    handleCancel,
  } = useEditExam();

  return (
    <div className="flex flex-col items-center mt-[70px] overflow-hidden">
      {useLoading() ? (
        <div className="spinner"></div>
      ) : (
        <>
          <p className="text-center mb-4 text-4xl">Edit Exam</p>
          <ShowExam
            createExamFields={createExamFields}
            error={error}
            setCurrQuestion={setCurrQuestion}
            currQuestion={currQuestion}
            validateExamData={validateExamData}
            validate={validate}
          />

          <div className="flex mt-[10px] gap-2">
            <Button onSubmit={handleEditExam} disable={!edited}>
              Submit
            </Button>
            <Button onSubmit={handleDeleteExam}>
              Delete
            </Button>
            <Button onSubmit={handleCancel}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditExam;

import React from "react";
import ShowExam from "../../../shared/ShowExam";
import { useCreateExam } from "../teacherContainer/useCreateExam";
import { useLoading } from "../../../form/hooks/useLoading";
import Button from "../../../shared/Button";

const CreateExam = () => {
  const {
    createExamFields,
    validateExamData,
    validate,
    error,
    currQuestion,
    Options,
    setCurrQuestion,
    handleCreateExam,
    handleCancel,
  } = useCreateExam();

  const btnDisable = useLoading() || currQuestion !== 14;

  return (
    <div className="flex items-center flex-col mt-[70px]">
      <p className="text-center text-4xl mb-4">Create Exam</p>

      <ShowExam
        createExamFields={createExamFields}
        error={error}
        setCurrQuestion={setCurrQuestion}
        currQuestion={currQuestion}
        validateExamData={validateExamData}
        validate={validate}
        Options={Options}
      />

      <div className="pt-2 flex gap-2">
        <Button onSubmit={handleCreateExam} disable={btnDisable}>
          <span>{useLoading() ? "Loading..." : "Create Exam"}</span>
        </Button>
        <Button onSubmit={handleCancel}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default CreateExam;

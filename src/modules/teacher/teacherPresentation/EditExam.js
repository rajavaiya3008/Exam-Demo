import React from "react";
import ShowExam from "../../../components/ShowExam";
import { useEditExam } from "../teacherContainer/useEditExam";
import { useLoading } from "../../../form/hooks/useLoading";
import Button from "../../../shared/Button";
import Loader from "../../../shared/Loader";

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

  const editBtn = [
    {
      submit: handleEditExam,
      disable: !edited,
      name: "Submit",
    },
    {
      submit: handleDeleteExam,
      name: "Delete",
    },
    {
      submit: handleCancel,
      name: "Cancel",
    },
  ];

  return (
    <div className="flex flex-col items-center mt-[70px] overflow-hidden">
      {useLoading() ? (
        <Loader loaderStyle="spinner"/>
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
            {editBtn.map(({ submit, disable, name }, i) => (
              <Button onSubmit={submit} disable={disable} key={i}>
                {name}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EditExam;

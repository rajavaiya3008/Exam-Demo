import { handleStudentAns } from "../redux/slices/student";

export const radioField = (examData, error, currQuestion, Options, option) => {
  return {
    type: "radio",
    name: "ans",
    id: `op${option}`,
    data: Options,
    examData: examData,
    updateData: handleStudentAns,
    currQuestion: currQuestion,
    ans: examData?.questions?.[currQuestion]?.answer,
    opIndex: option - 1,
    error: error,
  };
};

export const optionField = (Options, currQuestion, error, option) => {
  return {
    type: "text",
    id: `op${option}`,
    name: `op${option}`,
    label: `Option ${option}`,
    data: Options,
    disable: true,
    currQuestion: currQuestion,
    opIndex: option - 1,
    error: error,
  };
};

export const examPaperFields = (examData, error, currQuestion, Options) => {
  return [
    {
      type: "text",
      id: "subject",
      name: "subjectName",
      label: "Subject Name",
      data: examData,
      disable: true,
      error: error,
    },
    {
      type: "text",
      id: "question",
      name: "question",
      label: `Question ${currQuestion + 1}`,
      data: examData?.questions?.[currQuestion],
      disable: true,
      currQuestion: currQuestion,
      error: error,
    },
    radioField(examData, error, currQuestion, Options, 1),
    optionField(Options, currQuestion, error, 1),
    radioField(examData, error, currQuestion, Options, 2),
    optionField(Options, currQuestion, error, 2),
    radioField(examData, error, currQuestion, Options, 3),
    optionField(Options, currQuestion, error, 3),
    radioField(examData, error, currQuestion, Options, 4),
    optionField(Options, currQuestion, error, 4),
  ];
};

export const ansArray = (examData) => {
    const ansArr = examData?.questions?.reduce((acc, curr) => {
        const obj = {
          question: curr._id,
          answer: curr.answer,
        };
        if (curr.answer) {
          acc.push(obj);
        }
        return acc;
      }, []);

      return {ansArr}
}

export const showExam = (subjectName,questions) => {
    const showExamData = {
        subjectName,
        questions,
        notes:['Exams']
    }
    return {showExamData}
}




// {
//     type: "radio",
//     name: "ans",
//     id: "op2",
//     data: Options,
//     examData: examData,
//     updateData: handleStudentAns,
//     currQuestion: currQuestion,
//     ans: examData?.questions?.[currQuestion]?.answer,
//     opIndex: 1,
//     error: error,
//   },
//   {
//     type: "text",
//     id: "op2",
//     name: "op2",
//     label: "Option 2",
//     data: Options,
//     disable: true,
//     currQuestion: currQuestion,
//     opIndex: 1,
//     error: error,
//   },
//   {
//     type: "radio",
//     name: "ans",
//     id: "op3",
//     data: Options,
//     examData: examData,
//     updateData: handleStudentAns,
//     currQuestion: currQuestion,
//     ans: examData?.questions?.[currQuestion]?.answer,
//     opIndex: 2,
//     error: error,
//   },
//   {
//     type: "text",
//     id: "op3",
//     name: "op3",
//     label: "Option 3",
//     data: Options,
//     disable: true,
//     currQuestion: currQuestion,
//     opIndex: 2,
//     error: error,
//   },
//   {
//     type: "radio",
//     name: "ans",
//     id: "op4",
//     data: Options,
//     examData: examData,
//     updateData: handleStudentAns,
//     currQuestion: currQuestion,
//     ans: examData?.questions?.[currQuestion]?.answer,
//     opIndex: 3,
//     error: error,
//   },
//   {
//     type: "text",
//     id: "op4",
//     name: "op4",
//     label: "Option 4",
//     data: Options,
//     disable: true,
//     currQuestion: currQuestion,
//     opIndex: 3,
//     error: error,
//   },

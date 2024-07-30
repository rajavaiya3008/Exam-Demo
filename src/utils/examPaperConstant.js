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

  return { ansArr };
};

export const showExam = (subjectName, questions) => {
  const showExamData = {
    subjectName,
    questions,
    notes: ["Exams"],
  };
  return { showExamData };
};

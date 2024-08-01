import { useDispatch, useSelector } from "react-redux";
import { loadExamPaper } from "../../redux/slices/student";
import { loadExamData } from "../../redux/slices/teacher";

export const useExam = () => {
  const dispatch = useDispatch();
  const examPaper = useSelector((state) => state.student.examPaper);
  const createExam = useSelector((state) => state.teacher.createExam);
  const ansIndex = useSelector((state) => state.teacher.ansIndex);

  const handleSubject = (data) => {
    const { value } = data;
    const updatedPaper = {
      ...createExam,
      subjectName: value,
    };
    dispatch(loadExamData(updatedPaper));
  };

  const handleQuestion = (data) => {
    const { value, queIndex } = data;
    const updatedPaper = {
      ...createExam,
      questions: createExam.questions.map((question, index) =>
        index === queIndex ? { ...question, question: value } : question
      ),
    };
    dispatch(loadExamData(updatedPaper));
  };

  const handleOptions = (data) => {
    const { queIndex, opIndex, value } = data;
    let updatedPaper;
    if (
      createExam.questions[queIndex].options[opIndex] ===
        createExam.questions[queIndex].answer &&
      ansIndex[queIndex] === opIndex
    ) {
      updatedPaper = {
        ...createExam,
        questions: createExam.questions.map((question, index) =>
          index === queIndex ? { ...question, answer: value } : question
        ),
      };
    }
    if (!updatedPaper) {
      updatedPaper = { ...createExam };
    }
    const updatedQuestions = updatedPaper?.questions?.map((question, index) => {
      if (index === queIndex) {
        const updatedOptions = [...question.options];
        updatedOptions[opIndex] = value;

        return {
          ...question,
          options: updatedOptions,
        };
      }
      return question;
    });
    updatedPaper = {
      ...updatedPaper,
      questions: updatedQuestions,
    };
    dispatch(loadExamData(updatedPaper));
  };

  const updateExamData = (exam, queIndex, ans, dispatchAction) => {
    const updatedPaper = {
      ...exam,
      questions: exam.questions.map((question, index) =>
        index === queIndex ? { ...question, answer: ans } : question
      ),
    };
    dispatch(dispatchAction(updatedPaper));
  };

  const handleStudentAns = (data) => {
    const { queIndex, ans } = data;
    updateExamData(examPaper, queIndex, ans, loadExamPaper);
  };

  const handleAns = (data) => {
    const { queIndex, ans } = data;
    updateExamData(createExam, queIndex, ans, loadExamData);
  };

  return {
    handleStudentAns,
    handleAns,
    handleOptions,
    handleQuestion,
    handleSubject,
  };
};

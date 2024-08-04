import { useDispatch, useSelector } from "react-redux";
import { loadExamPaper } from "../../redux/slices/student";
import { handleAnsIndexes, loadExamData } from "../../redux/slices/teacher";

export const useExam = () => {
  const dispatch = useDispatch();
  const examPaper = useSelector((state) => state.student.examPaper);
  const createExam = useSelector((state) => state.teacher.createExam);
  const ansIndex = useSelector((state) => state.teacher.ansIndex);
  const queIndex = useSelector(state => state.teacher.currQuestion)

  const handleSubject = (e) => {
    const { value } = e.target;
    const updatedPaper = {
      ...createExam,
      subjectName: value,
    };
    dispatch(loadExamData(updatedPaper));
  };

  const handleQuestion = (e) => {
    const { value } = e.target;
    const updatedPaper = {
      ...createExam,
      questions: createExam.questions.map((question, index) =>
        index === queIndex ? { ...question, question: value } : question
      ),
    };
    dispatch(loadExamData(updatedPaper));
  };

  const handleOptions = (e) => {
    const { value,name } = e.target;
    const splitStr = name.match(/\d+/)
    const opIndex = Number(splitStr[0]) - 1;
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

  const handleStudentAns = (e) => {
    const { value:ans,id } = e.target;
    console.log('ans RRR', ans)
    // console.log('value', value)
    const splitStr = id.match(/\d+/)
    const opIndex = Number(splitStr[0]) - 1;
    dispatch(
      handleAnsIndexes({
        currQuestion: queIndex,
        ansIndex: opIndex,
      })
    );
    updateExamData(examPaper, queIndex, ans, loadExamPaper);
  };

  const handleAns = (e) => {
    const { value:ans,id } = e.target;
    console.log('id RRR', id)
    console.log('ans RRR', ans)
    const splitStr = id.match(/\d+/)
    const opIndex = Number(splitStr[0]) - 1;
    dispatch(
      handleAnsIndexes({
        currQuestion: queIndex,
        ansIndex: opIndex,
      })
    );
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

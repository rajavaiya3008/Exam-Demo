import { useDispatch, useSelector } from "react-redux";
import { loadExamPaper } from "../../redux/slices/student";
import { loadExamData } from "../../redux/slices/teacher";

export const useExam = () => {
    const dispatch = useDispatch()
    const examPaper = useSelector(state => state.student.examPaper)
    const createExam = useSelector(state => state.teacher.createExam)
    const ansIndex = useSelector(state => state.teacher.ansIndex)

    const handleSubject = (data) => {
      // state.edited = true;
      const { name, value } = data;
      // state.error = {};
      const updatedPaper = {
        ...createExam,
        subjectName:value
      }
      dispatch(loadExamData(updatedPaper))
      // state.createExam[name] = value;
      // setLocalStorageItem(CREATE_EXAM_CONST, state.createExam);
    }

    const handleQuestion = (data) => {
      // state.edited = true;
      const { name, value, queIndex } = data;
      // state.error = {};
      const updatedPaper = {
        ...createExam,
        questions: createExam.questions.map((question,index) => 
          index === queIndex
              ? {...question,question:value}
              : question
          )
      }
      dispatch(loadExamData(updatedPaper))
      // createExam.questions[queIndex][name] = value;
      // setLocalStorageItem(CREATE_EXAM_CONST, state.createExam);
    }

    const  handleOptions = (data) => {
      // state.edited = true;
      const { queIndex, opIndex, value } = data;
      // state.error = {};
      let updatedPaper;
      if (
        createExam.questions[queIndex].options[opIndex] ===
        createExam.questions[queIndex].answer &&
        ansIndex[queIndex] === opIndex
      ) {
         updatedPaper = {
          ...createExam,
          questions: createExam.questions.map((question, index) =>
              index === queIndex
                  ? { ...question, answer: value }
                  : question
          )
      }
        // createExam.questions[queIndex].answer = value;
      }
      if(!updatedPaper){
        updatedPaper = {...createExam}
      }
      const updatedQuestions = updatedPaper?.questions?.map((question, index) => {
        if (index === queIndex) {
          const updatedOptions = [...question.options];
          updatedOptions[opIndex] = value;
          
          return {
            ...question,
            options: updatedOptions
          };
        }
        return question;
      });
      updatedPaper = {
        ...updatedPaper,
        questions:updatedQuestions
      }
      // updatedPaper.questions[queIndex].options[opIndex] = value;
      // updatedPaper = {
      //   ...updatedPaper,
      //   questions: updatedPaper.questions.map((question,index) => 
      //   index === queIndex 
      //       ? {...question})
      // }
      dispatch(loadExamData(updatedPaper))
      // setLocalStorageItem(CREATE_EXAM_CONST, state.createExam);
    }

    const handleStudentAns = (data) => {
        const { queIndex, ans } = data;
        // state.error = {};
        console.log('examPaper', examPaper)
        const updatedPaper = {
          ...examPaper,
          questions: examPaper.questions.map((question, index) =>
              index === queIndex
                  ? { ...question, answer: ans }
                  : question
          )
      };

        // console.log('updatedPaper', updatedPaper)
        // updatedPaper.questions[queIndex].answer = ans;
        dispatch(loadExamPaper(updatedPaper))
        // setLocalStorageItem(EXAM_PAPER, state.examPaper);
      }

    const  handleAns = (Data) => {
        // state.edited = true;
        const { queIndex, ans } = Data;
        // state.error = {};
        const updatedPaper = {
          ...createExam,
          questions: createExam.questions.map((question, index) =>
              index === queIndex
                  ? { ...question, answer: ans }
                  : question
          )
      }
      dispatch(loadExamData(updatedPaper))
        // createExam.questions[queIndex].answer = ans;
        // setLocalStorageItem(CREATE_EXAM_CONST, state.createExam);
      }



    return {handleStudentAns,handleAns,handleOptions,handleQuestion,handleSubject}
}
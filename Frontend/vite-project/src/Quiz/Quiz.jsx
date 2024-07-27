import React, { useState, useEffect } from 'react';
import QuestionBox from './QuizBox.jsx/QuestionBox';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Intructions from './Instructions/Intructions';
import Result from './Result/Result';
import axios from 'axios';

function Quiz() { // Make sure state.quizzes exists and is an array
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score,setScore]=useState(0);
  const [instrRead,setinstrRead]=useState(false);
  const [quizFinished,setquizFinished]=useState(false);
  const userdetails = useSelector(state => state.userdetails);
  const currentQuiz = useSelector(state=>state.currentquiz) // Replace with dynamic ID if necessary
  const navigate=useNavigate();
  const handleNext = (answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleFinish = () => {
    let scored = 0;
    let ci = 0;
  
    answers.forEach((answer) => {
      if (answer && Number(answer) == Number(currentQuiz.questions[ci].correctOption-1)) {
        scored += currentQuiz.scoreCorrect;
      } else if(answer) {
        scored += currentQuiz.scoreIncorrect;
      }
      ci++;
    });
  
    setquizFinished(true,{ state: { score: scored } });
    setScore(scored);
    const formData={
    score:(scored/currentQuiz.numQuestions*currentQuiz.scoreCorrect)*100,
    quizId:currentQuiz._id,
    email:userdetails.email
    }
    axios.post("http://localhost:8000/quiz/finish",formData)
    .then(() => {
      setLoading(false);
      navigate('/'); // Redirect to create quiz page on successful sign-up
    })
    .catch((error) => {
      setLoading(false);
      setError('An error occurred. Please check the console for details.');
      console.log(error);
    },{ state: { score: scored } });
  };
  
  const handleBack = (answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const startQuiz=()=>{
    setinstrRead(true);
  }
  useEffect(() => {
    currentQuiz&&console.log(currentQuiz);
  }, []);

  return (
    <>
    {!quizFinished&&!instrRead&&(<Intructions quiz={currentQuiz} startQuiz={startQuiz}/>)}
    {!quizFinished&&instrRead&&(<QuestionBox 
      question={currentQuiz.questions[currentQuestionIndex]} 
      questionIndex={currentQuestionIndex}
      totalQuestions={currentQuiz.questions.length}
      handleNext={handleNext}
      handleBack={handleBack}
      answer={answers}
      handleFinish={handleFinish}
    />)}
    {quizFinished&&<Result score={score} totalscore={currentQuiz.numQuestions*currentQuiz.scoreCorrect}/>}
    </>
  );
}

export default Quiz;

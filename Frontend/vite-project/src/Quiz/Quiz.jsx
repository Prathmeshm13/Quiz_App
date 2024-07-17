import React, { useState, useEffect } from 'react';
import QuestionBox from './QuizBox.jsx/QuestionBox';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Quiz() { // Make sure state.quizzes exists and is an array
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score,setScore]=useState(0);
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
      if (answer && Number(answer) === Number(currentQuiz.questions[ci].correctOption)) {
        scored += currentQuiz.scoreCorrect;
      } else {
        scored -= currentQuiz.scoreIncorrect;
      }
      ci++;
    });
  
    setScore(scored);
    navigate('/', { state: { score: scored } });
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

  useEffect(() => {
    currentQuiz&&console.log(currentQuiz);
  }, []);

  return (
    <QuestionBox 
      question={currentQuiz.questions[currentQuestionIndex]} 
      questionIndex={currentQuestionIndex}
      totalQuestions={currentQuiz.questions.length}
      handleNext={handleNext}
      handleBack={handleBack}
      answer={answers}
      handleFinish={handleFinish}
    />
  );
}

export default Quiz;

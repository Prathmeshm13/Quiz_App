import './QuizPage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcurrentquiz } from '../../features/quiz';

function QuizCard(props) {
  const [registered, setReg] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const userdetails = useSelector(state => state.userdetails);
  const [userQuizzes, setUserQuizzes] = useState(userdetails.quizesRegistered || []);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    checkifQuizStarted();
  }, []);

  function checkifQuizStarted() {
    const quizStartTime = new Date(props.quiz.quizDate);
    const quizEndTime = new Date(quizStartTime.getTime() + props.quiz.quizDuration * 60000);
    const currentTime = new Date();
    console.log(props.quiz.quizName);
    if (currentTime >= quizStartTime && currentTime <= quizEndTime) {
      setQuizStarted(true);
    } else {
      setQuizStarted(false);
    }
  }

  async function handleRegister() {
    try {
      await axios.post(`http://localhost:8000/quiz/register?email=${userdetails.email}&quizId=${props.quiz._id}`);
      console.log('Registration sent successfully');
      setUserQuizzes(prev => [...prev, props.quiz._id]);
      setReg(true);
    } catch (error) {
      console.error('Error registering for quiz:', error);
    }
  }
  async function handleStartQuiz(e){
    console.log(e)
    dispatch(setcurrentquiz(e));
    navigate('/quiz');
  }
  return (
    <div className="quiz-card">
      <div className="quiz-info">
        <h3>{props.quiz.quizName}</h3>
        <p>{props.quiz.quizDate}</p>
        <div className='btcont'>
          {props.quiz && userdetails && !userQuizzes.includes(props.quiz._id) && (
            <button className='but' onClick={handleRegister}>Register</button>
          )}
          {props.quiz && userdetails && userQuizzes.includes(props.quiz._id) && (
            <button className='but' disabled>Registered</button>
          )}
          {props.quiz && userdetails && userQuizzes.includes(props.quiz._id)&& quizStarted && (
            <button className='but' onClick={()=>handleStartQuiz(props.quiz)}>Start Quiz</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizCard;


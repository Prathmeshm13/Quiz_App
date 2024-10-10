import './QuizPage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcurrentquiz } from '../../features/quiz';

function QuizCard(props) {
  const [registered, setReg] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const userdetails = useSelector(state => state.userdetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userdetails && props.quiz) {
      checkifQuizStarted();
      checkifQuizAttempted(props.quiz);
      checkifQuizReg();
    }
    console.log(userdetails);
    console.log(registered);
    console.log(quizStarted);
    console.log(quizAttempted);
  }, [userdetails, props.quiz]);

  function checkifQuizStarted() {
    const quizStartTime = new Date(props.quiz.quizDate);
    const quizEndTime = new Date(quizStartTime.getTime() + props.quiz.quizDuration * 60000);
    const currentTime = new Date();
    console.log(props.quiz.quizName);
    setQuizStarted(currentTime >= quizStartTime && currentTime <= quizEndTime);
  }

  function checkifQuizReg() {
    if (userdetails && Array.isArray(userdetails.quizesRegistered)) {
      const quizRegistered = userdetails.quizesRegistered.includes(props.quiz._id);
      setReg(quizRegistered);
    }
  }

  function checkifQuizAttempted(quiz) {
    console.log(userdetails.quizesAttempted);
    if (userdetails && Array.isArray(userdetails.quizesAttempted)) {
      const attemptedQuiz = userdetails.quizesAttempted.find(obj => obj.quizId === quiz._id);
      console.log(attemptedQuiz);
      if (attemptedQuiz) {
        setQuizScore(attemptedQuiz.score);
        setQuizAttempted(true);
      } else {
        setQuizAttempted(false);
      }
    }
  }

  async function handleRegister() {
    setReg(true);
    try {
      await axios.post(`http://localhost:8000/quiz/register?email=${userdetails.email}&quizId=${props.quiz._id}`);
      console.log('Registration sent successfully');
      const newQuizzes = [...userdetails.quizesRegistered, props.quiz._id];
      // Update the state and set registered to true
      userdetails.quizesRegistered = newQuizzes;
    } catch (error) {
      console.error('Error registering for quiz:', error);
    }
  }

  async function handleStartQuiz(e) {
    console.log(e);
    dispatch(setcurrentquiz(e));
    navigate('/quiz');
  }

  return (
    <div className="quiz-card">
      <div className="quiz-info">
        <h3>{props.quiz.quizName}</h3>
        <p>{props.quiz.quizDate}</p>
        <div className="btcont">
          {props.quiz && userdetails && !registered && !quizAttempted && (
            <button className="but" onClick={handleRegister}>Register</button>
          )}
          {props.quiz && userdetails && registered && !quizAttempted && (
            <button className="but" disabled>Registered</button>
          )}
          {props.quiz && userdetails && registered && quizStarted && !quizAttempted && (
            <button className="but" onClick={() => handleStartQuiz(props.quiz)}>Start Quiz</button>
          )}
          {props.quiz && userdetails && registered && quizAttempted && (
            <button className="but" disabled>Attempted</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizCard;

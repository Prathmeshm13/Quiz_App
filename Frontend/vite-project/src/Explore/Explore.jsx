import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzes } from '../../features/quiz';
import Register from './Register/Register';
import '../Explore/Explore.css'

function Explore() {
  const quizes=useSelector(state=>state.quizes[0]);
  const user = useSelector(state => state.user);
  let [todaydate,settodaydate]=useState({});
  const dispatch=useDispatch();
  useEffect(() => {
    // Fetch quizzes when the component mounts
    dispatch(fetchQuizzes());
    console.log(quizes);
    const currentDate = new Date();
    settodaydate(currentDate);
    console.log(todaydate);
    console.log(user);
  }, []);
  function checkdate(qdate){
    qdate=new Date(qdate);
    if(qdate<todaydate){
      return true;
    }
    return false;
  }
  return (
    <div className='maincont'>
      <div>Explore</div>
      <div>Upcoming Quizzes</div>
      <div>
        {quizes&&quizes.map(quiz => (
          (checkdate(quiz.quizDate)&&<Register quiz={quiz} userEmail={user}/>)
        ))}
      </div>
      <div>Past Quizzes</div>
      <div>
      {quizes&&quizes.map(quiz => (
          (!checkdate(quiz.quizDate)&&<Register quiz={quiz} userEmail={user}/>)
        ))}
      </div>
    </div>
  );
}

export default Explore;

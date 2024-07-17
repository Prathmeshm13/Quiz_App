import React, { useState } from 'react'
import '../Register/Register.css'
import axios from 'axios';
function Register(props) {
  const [registered,setreg]=useState(false);
  async function handleRegister(){
    try {
        await axios.post(`http://localhost:8000/quiz/register?email=${props.userEmail}&quizId=${props.quiz._id}`);
        console.log('sent successfully')
        setreg(true);
      } catch (error) {
        console.error('Error checking user existence:', error);
      }
  }
  return (
    <div className='cont'>
    <div className='sshead'>{props.quiz.quizName}</div>
    {!registered&&<button className='but' onClick={handleRegister}>Register</button>}
    {registered&&<button className='but'>Registered</button>}
    </div>
  )
}

export default Register
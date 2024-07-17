import React from 'react'

function RegList(props) {
  return (
    <>
    <tr key={props.quiz.quizName}>
    <td>{props.quiz.quizDuration}</td>
    <td>{props.quiz.quizName}</td>
    <td>{props.quiz.quizDate}</td>
  </tr>
  </>
  )
}

export default RegList
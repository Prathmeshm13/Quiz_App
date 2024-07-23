import React from 'react';

const RegList = ({ quiz, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{quiz.quizName}</td>
      <td>{new Date(quiz.quizDate).toLocaleDateString()}</td>
      <td>{quiz.result}</td>
    </tr>
  );
};

export default RegList;

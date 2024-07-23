import React from 'react';
import './Instructions.css';

function Instructions(props) {
  return (
    <div className="instructions-container">
      <h2 className="instructions-title">Instructions</h2>
      <p className="instructions-text">
        Welcome to the <strong>{props.quiz.quizName}</strong>! Please read the following instructions:
      </p>
      <ul className="instructions-list">
        <li><strong>Date & Time:</strong> {new Date(props.quiz.quizDate).toLocaleString()}</li>
        <li><strong>Duration:</strong> {props.quiz.quizDuration / 60} minutes</li>
        <li><strong>Questions:</strong> {props.quiz.numQuestions}</li>
        <li><strong>Scoring:</strong> +{props.quiz.scoreCorrect} for correct answers, {props.quiz.scoreIncorrect} for incorrect answers</li>
      </ul>
      <button className="start-button" onClick={props.startQuiz}>Start</button>
    </div>
  );
}

export default Instructions;

import React, { useState } from "react";
import "./QuizForm.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddQuestionForm from "./Create Questions/CreateQuestion";

const QuizForm = () => {
  const navigate = useNavigate();
  let [formData, setFormData] = useState({
    quizName: "",
    quizType: "",
    genre: "",
    quizDate: "",
    quizDuration: 0,
    numQuestions: 0,
    scoreCorrect: 0,
    scoreIncorrect: 0,
    ques: []
  });
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState('');
  let [quizCreated, setQuizCreated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionformrender = () => {
    setQuizCreated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Simple form validation
    setLoading(true);
    axios
      .post('http://localhost:8000/quiz/createquiz', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setLoading(false);
        navigate('/'); // Redirect to create quiz page on successful sign-up
      })
      .catch((error) => {
        setLoading(false);
        setError('An error occurred. Please check the console for details.');
        console.log(error);
      });
  };

  const handleCancel = () => {
    setFormData({
      quizName: "",
      quizType: "",
      genre: "",
      quizDate: "",
      quizDuration: 0,
      numQuestions: 0,
      scoreCorrect: 0,
      scoreIncorrect: 0,
      ques: []
    });
  };

  const addQuestion = (newQuestion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ques: [...prevFormData.ques, newQuestion]
    }));
  };
  return (
    <>
      {!quizCreated && (
        <div className="quiz-form">
          <h1>Create Quiz</h1>
          <p>Enter all the necessary details</p>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="sub-form">
                <div className="form-group">
                  <label htmlFor="quizName">Name of Quiz:</label>
                  <input
                    type="text"
                    id="quizName"
                    name="quizName"
                    value={formData.quizName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quizType">Quiz Type:</label>
                  <input
                    type="text"
                    id="quizType"
                    name="quizType"
                    value={formData.quizType}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="genre">Genre:</label>
                  <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quizDate">Quiz Date and Time:</label>
                  <input
                    type="datetime-local"
                    id="quizDate"
                    name="quizDate"
                    value={formData.quizDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="sub-form">
                <div className="form-group">
                  <label htmlFor="quizDuration">Quiz Duration(in mins):</label>
                  <input
                    type="Number"
                    id="quizDuration"
                    name="quizDuration"
                    value={formData.quizDuration}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numQuestions">No. of Questions:</label>
                  <input
                    type="Number"
                    id="numQuestions"
                    name="numQuestions"
                    value={formData.numQuestions}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="scoreCorrect">Score for correct answer:</label>
                  <input
                    type="Number"
                    id="scoreCorrect"
                    name="scoreCorrect"
                    value={formData.scoreCorrect}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="scoreIncorrect">
                    Score for incorrect answer:
                  </label>
                  <input
                    type="Number"
                    id="scoreIncorrect"
                    name="scoreIncorrect"
                    value={formData.scoreIncorrect}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="button-group">
              <button type="button" onClick={handleQuestionformrender}>Add Questions</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {quizCreated && formData.ques.length < formData.numQuestions && (
        <AddQuestionForm questoCreate={formData.numQuestions} addQuestion={addQuestion} />
      )}
      {quizCreated && formData.ques.length == formData.numQuestions && (
        <div className="quiz-form">
          <div className="button-group">
            <button onClick={handleSubmit}>Create Quiz</button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizForm;

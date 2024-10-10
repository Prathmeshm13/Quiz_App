import React, { useState } from "react";
import "./QuizForm.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateQuestion from "./Create Questions/CreateQuestion";

const QuizForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizCreated, setQuizCreated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionFormRender = () => {
    setQuizCreated(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('http://localhost:8000/quiz/createquiz', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      navigate('/'); // Redirect to home page after quiz creation
    } catch (error) {
      setLoading(false);
      setError('An error occurred while creating the quiz. Please try again.');
      console.error(error);
    }
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
    <div className="quiz-form-container">
      {!quizCreated ? (
        <div className="quiz-form">
          <h1>Create Quiz</h1>
          <p>Enter all the necessary details to create the quiz</p>
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </div>
              </div>

              <div className="sub-form">
                <div className="form-group">
                  <label htmlFor="quizDuration">Quiz Duration (in mins):</label>
                  <input
                    type="number"
                    id="quizDuration"
                    name="quizDuration"
                    value={formData.quizDuration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numQuestions">No. of Questions:</label>
                  <input
                    type="number"
                    id="numQuestions"
                    name="numQuestions"
                    value={formData.numQuestions}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="scoreCorrect">Score for correct answer:</label>
                  <input
                    type="number"
                    id="scoreCorrect"
                    name="scoreCorrect"
                    value={formData.scoreCorrect}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="scoreIncorrect">Score for incorrect answer:</label>
                  <input
                    type="number"
                    id="scoreIncorrect"
                    name="scoreIncorrect"
                    value={formData.scoreIncorrect}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="button-group">
              <button type="button" className="add-questions-btn" onClick={handleQuestionFormRender}>
                Add Questions
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      ) : formData.ques.length < formData.numQuestions ? (
        <CreateQuestion questoCreate={formData.numQuestions} addQuestion={addQuestion} />
      ) : (
        <div className="quiz-form">
          <div className="button-group">
            <button className="create-quiz-btn" onClick={handleSubmit}>Create Quiz</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizForm;

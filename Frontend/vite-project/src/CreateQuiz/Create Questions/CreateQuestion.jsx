import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateQuestion.css";

const AddQuestionForm = (props) => {
  const [quests, setQuests] = useState([]);
  const [questionType, setQuestionType] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    setOptions([""]);
    setAnswer("");
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const delOption = () => {
    if (options.length > 1) {
      const newOptions = [...options];
      newOptions.pop();
      setOptions(newOptions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Simple form validation
    if (!questionType || !questionText || (questionType === "mcq" && (!answer || options.includes("")))) {
      setError('Please fill out all fields.');
      return;
    }

    const formData = {
      questionType,
      questionText,
      options: questionType === "mcq" ? options : null,
      answer,
    };

    const updatedQuestions = [...quests, formData];
    setQuests(updatedQuestions);
    props.addQuestion(formData);

    if (updatedQuestions.length >= props.questoCreate) {
      setLoading(true);
    } else {
      setQuestionType("");
      setQuestionText("");
      setOptions([""]);
      setAnswer("");
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <h2>Add Question: {quests.length + 1}/{props.questoCreate}</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Question Type:
          <select value={questionType} onChange={handleQuestionTypeChange}>
            <option value="">Select question type</option>
            <option value="subjective">Subjective</option>
            <option value="mcq">Multiple Choice</option>
          </select>
        </label>

        {questionType && (
          <label>
            Question:
            <textarea value={questionText} onChange={handleQuestionTextChange} />
          </label>
        )}

        {questionType === "mcq" && (
          <>
            {options.map((option, index) => (
              <label key={index}>
                Option {index + 1}:
                <input
                  className="ado1"
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </label>
            ))}
            <button type="button" onClick={addOption}>
              Add Option
            </button>
            <button type="button" onClick={delOption}>
              Delete Option
            </button>
            <label>
              Answer Option Number:
              <input
                type="number"
                value={answer}
                onChange={handleAnswerChange}
              />
            </label>
          </>
        )}

        {questionType === "subjective" && (
          <label>
            Answer:
            <textarea
              value={answer}
              onChange={handleAnswerChange}
            />
          </label>
        )}

        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Next'}
          </button>
          <button type="button" className="go-back" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <button type="button" className="cancel-quiz" onClick={() => navigate("/")}>
            Cancel Quiz
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddQuestionForm;

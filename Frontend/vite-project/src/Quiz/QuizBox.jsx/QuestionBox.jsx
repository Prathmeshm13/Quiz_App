import React, { useEffect } from 'react';
import './questionBox.css';

const QuestionBox = ({ question, questionIndex, totalQuestions, handleNext, handleBack, answer, handleFinish }) => {
  const [selectedOption, setSelectedOption] = React.useState(answer[questionIndex]);

  const handlenextincomp = (op) => {
    handleNext(op); // Store the current answer
    setSelectedOption(answer[questionIndex + 1]); // Move to next question's answer
  };

  const handlebackincomp = (op) => {
    handleBack(op); // Store the current answer
    setSelectedOption(answer[questionIndex - 1]); // Move to previous question's answer
  };

  const handlefinishincomp = () => {
    handleFinish(); // Call finish handler
  };

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex); // Update the selected option in the local state
  };

  useEffect(() => {
    setSelectedOption(answer[questionIndex]); // Update the selected option when questionIndex changes
  }, [questionIndex, answer]);

  return (
    <div className="quiz-container">
      <h2>{question?.questionText}</h2>
      <div className="question-container">
        {question?.options?.map((option, index) => (
          <div className="option" key={index}>
            <button
              className={`option-button ${selectedOption === index ? 'selected' : ''}`}
              onClick={() => handleOptionChange(index)}
            >
              {String.fromCharCode(65 + index)}
            </button>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button 
          className="back-button" 
          onClick={() => handlebackincomp(selectedOption)} 
          disabled={questionIndex === 0}
        >
          Back
        </button>

        {/* Show the Next button if it's not the last question */}
        {questionIndex < totalQuestions - 1 && (
          <button
            className="next-button"
            onClick={() => handlenextincomp(selectedOption)}
            disabled={selectedOption === null}
          >
            Save
          </button>
        )}

        {/* Always show Finish button, but only enable after answering all questions */}
        {questionIndex === totalQuestions - 1 && (
          <button
            className="next-button"
            onClick={() => handlenextincomp(selectedOption)} 
            disabled={selectedOption === null}
          >
            Save
          </button>
        )}

        {/* Separate Finish button that is always available at the end */}
        {questionIndex === totalQuestions - 1 && (
          <button
            className="finish-button"
            onClick={handlefinishincomp}
            disabled={answer.some(ans => ans === null)} // Disable if any answer is still missing
          >
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionBox;

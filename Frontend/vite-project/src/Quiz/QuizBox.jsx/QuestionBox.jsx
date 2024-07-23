import React, { useEffect } from 'react';
import './questionBox.css';

const QuestionBox = ({ question, questionIndex, totalQuestions, handleNext, handleBack, answer,handleFinish }) => {
  const [selectedOption, setSelectedOption] = React.useState(answer[questionIndex]);

  const handlenextincomp=(op)=>{
    handleNext(op);
    setSelectedOption(answer[questionIndex+1]);
  }
  const handlebackincomp=(op)=>{
    handleBack(op);
    setSelectedOption(answer[questionIndex-1]);
  }
  const handlefinishincomp=(op)=>{
    handleNext(op);
    setSelectedOption(answer[questionIndex+1]);
    handleFinish();
  }
  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  useEffect(()=>{
    setSelectedOption(answer[questionIndex]);
  },[])
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
          onClick={()=>handlebackincomp(selectedOption)} 
          disabled={questionIndex === 0}
        >
          Back
        </button>
        {questionIndex === totalQuestions - 1 ? <button 
          className="next-button" 
          onClick={() => handlefinishincomp(selectedOption)} 
          disabled={selectedOption === null}
        >Finish</button> : <button 
          className="next-button" 
          onClick={() => handlenextincomp(selectedOption)} 
          disabled={selectedOption === null}
        >Next</button>}
        
      </div>
    </div>
  );
};

export default QuestionBox;

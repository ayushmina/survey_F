// Modify the structure of survey data to include responses
const initialSurveys = [
    {
      title: "Survey 1",
      questions: [
        { type: "text", text: "What's your name?", response: "" },
        { type: "multipleChoice", text: "How often do you exercise?", options: ["Rarely", "Sometimes", "Regularly"], response: "" }
      ]
    },
    // ... other surveys
  ];
  
  // Inside SurveyList.js
  // const handleRespond = (surveyIndex, questionIndex, response) => {
  //   const updatedSurveys = [...surveys];
  //   updatedSurveys[surveyIndex].questions[questionIndex].response = response;
  //   setSurveys(updatedSurveys);
  // };
  
  // Inside SurveyList.js, render the "Participate" button
  // <button className="participate-button" onClick={() => handleExpandSurvey(surveyIndex)}>
  //   {expandedSurveyIndex === surveyIndex ? 'Collapse' : 'Participate'}
  // </button>
  
  // // Inside SurveyList.js, render the ParticipationComponent when expanded
  // {expandedSurveyIndex === surveyIndex && (
  //   <ParticipationComponent
  //     survey={survey}
  //     // onRespond={(questionIndex, response) => handleRespond(surveyIndex, questionIndex, response)}
  //   />
  // )}
  
  // Create a new ParticipationComponent.js
  // import React, { useState } from 'react';
  
  const ParticipationComponent = ({ surveys, onRespond }) => {
    const handleResponseChange = (questionIndex, event) => {
      const response = event.target.value;
      // onRespond(questionIndex, response);
    };
  
    return (
      
      <div className="participation-component">
        {surveys.map((survey, surveyIndex) => (
        <>
        <h3>{survey.title}</h3>
        { 
        survey.questions.map((question, questionIndex) => (
           
          <div key={questionIndex} className="question">
            <p>{question.text}</p>
            {question.type === 'text' && (
              <input type="text" onChange={(e) => handleResponseChange(questionIndex, e)} />
            )}
            {question.type === 'multipleChoice' && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex}>
                    <input
                      type="radio"
                      name={`question_${questionIndex}`}
                      value={option}
                      onChange={(e) => handleResponseChange(questionIndex, e)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          
          </div>
        ))
      }
      </>

        )
        )
        
    

      }

     
      </div>
    );
  };
  
  export default ParticipationComponent;
  
import React, { useEffect, useState } from 'react';
import surveyActions from '../actions/surveyActions';

const ResponseListComponent = ({  }) => {
    const[list,setList]=useState([]);
  const [expandedSurveyIndex, setExpandedSurveyIndex] = useState(-1);

  const handleExpandSurvey = (surveyIndex) => {
    setExpandedSurveyIndex((prevIndex) =>
      prevIndex === surveyIndex ? -1 : surveyIndex
    );
  };
  useEffect(()=>{
    surveyActions.myResponse({},(err,res)=>{
        if(err){
            alert("something is wrong ");
        }else{
            console.log(res.data,"here is data")
            setList(res.data);
        }
    })
  },[])

  return (
    <div className="survey-list-container">
      <h2>Response List</h2>
      {list.map((survey, surveyIndex) => (
        <div key={surveyIndex} className="survey-item">
          <h3>{survey.Title}</h3>
          <div className="survey-actions">
            <button
              className="view-button"
              onClick={() => handleExpandSurvey(surveyIndex)}
            >
              {expandedSurveyIndex === surveyIndex ? 'Collapse' : 'View Response'}
            </button>
          </div>
          {expandedSurveyIndex === surveyIndex && (
            <div className="questions-container">
              <div className="responses-component">
      <h2>Survey Responses</h2>
      {survey.responses.map((response, index) => (
        <div key={index} className="response">
          <h3>Question {index + 1}:</h3>
          <p>{response.text}</p>
          <h4>Answer:</h4>
          <p>{response.answer}</p>
        </div>
      ))}
    </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResponseListComponent;

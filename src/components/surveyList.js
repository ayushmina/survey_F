import React, { useState } from 'react';
// import './SurveyList.css'; // Import the CSS file



const SurveyList = ({ surveys, onDelete, onEdit }) => {
  const [expandedSurveyIndex, setExpandedSurveyIndex] = useState(-1);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedQuestion, setEditedQuestion] = useState('');

  const handleExpandSurvey = (surveyIndex) => {
    if (expandedSurveyIndex === surveyIndex) {
      setExpandedSurveyIndex(-1);
    } else {
      setExpandedSurveyIndex(surveyIndex);
    }
  };

  const handleTitleEdit = (surveyIndex) => {
    setEditedTitle(surveys[surveyIndex].title);
  };

  const handleQuestionEdit = (questionText) => {
    setEditedQuestion(questionText);
  };

  return (
    <div className="survey-list-container">
      <h2>Survey List</h2>
      {surveys.map((survey, surveyIndex) => (
        <div key={surveyIndex} className="survey-item">
          <h3>{survey.title}</h3>
          <div className="survey-actions">
            <button className="delete-button" onClick={() => onDelete(surveyIndex)}>Delete</button>
            <button className="view-button" onClick={() => handleExpandSurvey(surveyIndex)}>
              {expandedSurveyIndex === surveyIndex ? 'Collapse' : 'View Questions'}
            </button>
            <button className="edit-button" onClick={() => {}}>Edit</button>
          </div>
          {expandedSurveyIndex === surveyIndex && (
            <div className="questions-container">
              {survey.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question">
                       <p>{questionIndex+1} Question Text:- {question.text}</p>
                       <p> Type:- {question.type}</p>


                  {question.type === 'multipleChoice' && (
                    <ul>
                      {question.options.map((option, optionIndex) => (
                        <li key={optionIndex}>{option}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    // <div className="survey-list-container">
    //   <h2>Survey List</h2>
    //   {surveys.map((survey, surveyIndex) => (
    //     <div key={surveyIndex} className="survey-item">
    //       {editedTitle === survey.title ? (
    //         <input
    //           type="text"
    //           value={editedTitle}
    //           onChange={(e) => setEditedTitle(e.target.value)}
    //         />
    //       ) : (
    //         <h3>{survey.title}</h3>
    //       )}
    //       <div className="survey-actions">
    //         <button className="delete-button" onClick={() => onDelete(surveyIndex)}>Delete</button>
    //         <button className="view-button" onClick={() => handleExpandSurvey(surveyIndex)}>
    //           {expandedSurveyIndex === surveyIndex ? 'Collapse' : 'View Questions'}
    //         </button>
    //         <button className="edit-button" onClick={() => handleTitleEdit(surveyIndex)}>
    //           {editedTitle === survey.title ? 'Save' : 'Edit'}
    //         </button>
    //       </div>
    //       {expandedSurveyIndex === surveyIndex && (
    //         <div className="questions-container">
    //           {survey.questions.map((question, questionIndex) => (
    //             <div key={questionIndex} className="question">
    //               {editedQuestion === question.text ? (
    //                 <input
    //                   type="text"
    //                   value={editedQuestion}
    //                   onChange={(e) => handleQuestionEdit(e.target.value)}
    //                 />
    //               ) : (
    //                 <p>{question.text}</p>
    //               )}
    //              <select
    //                 value={question.type}
    //                 onChange={(e) => onEdit(surveyIndex, questionIndex, 'type', e.target.value)}
    //               >
    //                 <option value="text">Text</option>
    //                 <option value="multipleChoice">Multiple Choice</option>
    //                 <option value="rating">Rating Scale</option>
    //               </select>
    //               {question.type === 'multipleChoice' && (
    //                 <ul>
    //                   {question.options.map((option, optionIndex) => (
    //                     <li key={optionIndex}>{option}</li>
    //                   ))}
    //                 </ul>
    //               )}
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   ))}
    // </div>
  );
};

export default SurveyList;

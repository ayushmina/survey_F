import React, { useState } from 'react';
import surveyActions from '../actions/surveyActions';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const Home = ({ onSubmit }) => {
     

  cookie.set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQwNzY4MjE3MzRkYWM4ZmVjMjkxMjciLCJpYXQiOjE2OTEzODM0Mjd9.m4TOWRkk3zzNPojGA7MeTJGCRQYpr0VRvYmFrOT3DzY")
  
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ type: 'text', text: '', options: [''] }]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].type = event.target.value;
    newQuestions[index].options = ['']; // Reset options for the selected type
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: 'text', text: '', options: [''] }]);
  };

  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleSubmit =async () => {
    onSubmit({ title, questions });
  
    let dataToSend={
      Title:title,
      questions
    }
    await surveyActions.addPost(dataToSend,(err,res)=>{
      if(err){

      }else{
        console.log(res);
        alert("add successfully")
         setTitle('');
    setQuestions([{ type: 'text', text: '', options: [''] }]);
      }
    })
   
  };

  return (
    <div className="create-survey-container"> 
      <h2>Create Survey</h2>
      <label>Title: <input type="text" value={title} onChange={handleTitleChange} /></label>
      {questions.map((question, qIndex) => (
        <div key={qIndex}>
          <label>{qIndex+1} Question: <input type="text" value={question.text} onChange={(e) => handleQuestionChange(qIndex, e)} /></label>
          <label>Type: 
            <select value={question.type} onChange={(e) => handleQuestionTypeChange(qIndex, e)}>
              <option value="text">Text</option>
              <option value="multipleChoice">Multiple Choice</option>
              <option value="rating">Rating Scale</option>
            </select>
          </label>
          {question.type === 'multipleChoice' && (
            <div>
              { 
               question.options.map((option, oIndex) => (
                
                <input
                  key={oIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  placeholder={`Option ${oIndex + 1}`}
                />

                 ))
              }
              <button onClick={() => handleAddOption(qIndex)}>Add Option</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Survey</button>
    </div>
  );
};

export default Home;

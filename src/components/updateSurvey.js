import React, { useState, useEffect } from 'react';
import surveyActions from '../actions/surveyActions';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';

const cookie = new Cookies();
const UpdateSurvey = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ type: 'text', text: '', options: [''] }]);
  const { id } = useParams(); // Get the id parameter from the URL

  useEffect( () => {
    // Fetch survey data from backend based on surveyId
    async function fetchSurveyData() {
      try {
        surveyActions.getSurveyById(id,(err,res)=>{
            if(err){

            }else{
            const { Title, questions } = res.data;
            console.log(res.data,"her is  aa")
            setTitle(Title);
            setQuestions(questions);
            }
        });
        
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    }

    fetchSurveyData();
  }, []);

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


  const handleUpdateSurvey = async () => {
    const dataToSend = {
        id:id,
      Title:title,
      questions
    };

    console.log(title,questions);
    surveyActions.updateSurvey(dataToSend,(err,res)=>{
        if(err){

        }else{
            alert("update complete")
            window.location.reload();
            console.log(res.data);
        }
    })
  };

  return (
    <div className="create-survey-container">
      <h2>Edit Survey</h2>
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
      <button onClick={handleUpdateSurvey}>Update Survey</button>
    </div>
  );
};

export default UpdateSurvey;

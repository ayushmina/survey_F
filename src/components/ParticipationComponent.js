
import  { useState, useEffect } from 'react';
import surveyActions from '../actions/surveyActions';
import { useParams } from 'react-router-dom';

const ParticipationComponent = ({ onRespond }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([]);

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
            const questionsWithAnswer = questions.map((question) => ({
              ...question,
              answer: '' // Initialize the answer field with an empty string
            }));
            setResponse(questionsWithAnswer);
            }
        });
        
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    }

    fetchSurveyData();
  }, []);

  const onSubmit=()=>{
    console.log(response);
    let dataTosend={
      Title:title,
      responses:response,
      _id:id,
    }
    surveyActions.responseCreate(dataTosend,(err,res)=>{
      if(err){

      }else{
        console.log(res.data);
        alert("response submited")
      }
    })
  }

  const handleResponseChange = (questionIndex, event) => {
    const updatedResponse = [...response];
    updatedResponse[questionIndex].answer = event.target.value;
    setResponse(updatedResponse);
  };

  return (
    <>
   { response.length>0?<div className="participation-component">
      <h3>{title}</h3>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question">
          <p>{question.text}</p>
          {question.type === 'text' && (
            <input
              type="text"
              value={response[questionIndex].answer}
              onChange={(e) => handleResponseChange(questionIndex, e)}
            />
          )}
          {question.type === 'multipleChoice' && (
            <div>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="radio"
                    name={`question_${questionIndex}`}
                    value={option}
                    checked={response[questionIndex].answer=== option}
                    onChange={(e) => handleResponseChange(questionIndex, e)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          {question.type==="rating"&&(
          <div>
           <input
              type="number"
              max={10}
              min={0}
              value={response[questionIndex].answer}
              onChange={(e) => handleResponseChange(questionIndex, e)}
               ></input>
            </div>
          )
}
        </div>
      ))}
      
    </div>:""}
    <button onClick={(e)=>{
      e.preventDefault();
      console.log("i am inside buttom ");
      onSubmit();
    }}>Submit</button>
    </>
  );
};

export default ParticipationComponent;

  
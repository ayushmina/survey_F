import React, { Component, useState ,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import './App.css';
import Homes from "./components/Home";
import {useNavigate} from 'react-router-dom'
import SurveyList from "./components/surveyList";
import ParticipationComponent from "./components/ParticipationComponent";

function App() {
 
  const history=useNavigate();
  const [surveyData,setData]=useState([]);
  const handleSurveySubmit = (data) => {
    // You can handle submitting the survey data to the backend here
    
    setData([...surveyData, data]);
  };
  const handleQuestionEdit = (surveyIndex, questionIndex, field, value) => {
    const updatedSurveys = [...surveyData];
    updatedSurveys[surveyIndex].questions[questionIndex][field] = value;
    setData(updatedSurveys);
  };

  return (
    <>
    
            <Routes>
          
              <Route exact path="/" key="home" element={<Homes  onSubmit={handleSurveySubmit} />} />
              </Routes>

              <SurveyList surveys={surveyData} onEdit={handleQuestionEdit}></ SurveyList>
              <ParticipationComponent surveys={surveyData} />
    </>
  );
}

export default App;

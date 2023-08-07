import React, { Component, useState ,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import './App.css';
import Homes from "./components/Home";
import {useNavigate} from 'react-router-dom'
import SurveyList from "./components/surveyList";
import ParticipationComponent from "./components/ParticipationComponent";
import UpdateSurvey from "./components/updateSurvey";
import Navbarr from "./components/navBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyListForResponse from "./components/surveyListForResponse";
import ResponseListComponent from "./components/responseList";



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
            <Navbarr></Navbarr>
            <Routes>
          
              <Route exact path="/" key="home" element={<Homes  onSubmit={handleSurveySubmit} />} />

              <Route exact path="/updateSurvey/:id" key="home" element={<UpdateSurvey />} />
              <Route exact path="/SurveyList" key="home" element={ <SurveyList surveys={surveyData} onEdit={handleQuestionEdit}/>} />
              <Route exact path="/Participation/:id" key="home" element={ <ParticipationComponent surveys={surveyData} />} />
              <Route exact path="/SurveyListForResponse" key="home" element={ <SurveyListForResponse />} />
              <Route exact path="/Response" key="home" element={ <ResponseListComponent />} />


              </Routes>

              {/* <SurveyList surveys={surveyData} onEdit={handleQuestionEdit}></ SurveyList> */}
              <ParticipationComponent surveys={surveyData} />
    </>
  );
}

export default App;

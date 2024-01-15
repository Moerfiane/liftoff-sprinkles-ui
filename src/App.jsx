import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';
//import CreateAccountForm from './components/CreateAccountForm';
// import HorizontalExample from './components/HorizontalFormExample';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import CourseCard from './components/CourseCard';
//import Container  from 'react-bootstrap/Container';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateCourse from './components/CreateCourseForm';
import CreateModule from './components/CreateModuleForm';
import ViewCourses from './components/ViewAllCourses';
import SearchRecipe from './components/FindNewRecipes';
import CourseDetailsView from './components/ViewCourseDetails';
import CourseFeedback from './components/CourseFeedback';
import { LoginContext } from './utilities/checkLogin';
import EnrollConfirmationPage from './components/EnrollmentConfirmation';
import { CourseContext } from './utilities/checkCourses';

//Done: Build CourseCard component
//Done: Build Menu component
//Done: Build Sign up component
//Done: Build Login component
//TODO: Create a function that will refresh App routes when new courses are created
//TODO: Build Hero component
//TODO: Write about content
//TODO: Build Account Management screen
//TODO: Build CoursePage screen
//TODO: Build CourseCompletion screen
//TODO: Build Search screen
//Done: Build AddCourse screen
//Done: Set routes using react-router Set useState variables to refresh page based on menu items clicked



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userId') !== null);  
  const [courses, setCourses] = useState([]);
  
  //Absolutely not sure if this is the best or most efficient way to do this, but it's what I've got figured out for now!
  const updateApp = async () => {
      try {
        const response = await fetch(`http://localhost:8080/courses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);
        setCourses(data);
        console.log(courses);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  


  return (
      <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <CourseContext.Provider value={{courses, setCourses, updateApp}}>
          <Router>
            <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses/create" element={<CreateCourse />} />
              <Route path="/courses/modules/create" element={<CreateModule />} />
              <Route path="/courses/*" element={<ViewCourses />} />
              <Route path="/find" element={<SearchRecipe />} />
              <Route path="/dashboard" element={<Dashboard />} /> 
              <Route path="/feedback" element={<CourseFeedback />} />
              <Route path="/courses/enroll" element={<EnrollConfirmationPage/>} />
              <Route path="/" element={<LogIn />} />
              {courses.map(course => (
                <Route key={course.id} path={`courses/view/${course.id}`} element={<CourseDetailsView id={course.id}/>} />
              ))}
            </Routes>
          </Router>
        </CourseContext.Provider>
    </LoginContext.Provider>
  );
}


export default App;

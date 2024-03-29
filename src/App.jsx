import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import ModuleDetailsView from './components/ViewModuleDetails';
import FavoriteCoursePage from './components/FavoriteCourse';
import FavoriteCourseConfirmationPage from './components/ConfirmFavoriteCourse';
import { FavoriteContext } from './utilities/checkFavorites';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userId') !== null);  
  const [courses, setCourses] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  //TODO: Update this to "updateCourses" since that's really what it does
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
        setCourses(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  


  return (
      <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <CourseContext.Provider value={{courses, setCourses, updateApp}}>
          <FavoriteContext.Provider value={{favoriteCourses, setFavoriteCourses}}>
            <Router>
              <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<ViewCourses />} />
                  <Route path="/courses/create" element={<CreateCourse />} />
                  <Route path="/courses/enroll" element={<EnrollConfirmationPage/>} />
                  <Route path="/courses/modules/create" element={<CreateModule />} />
                    <Route path="courses/view/:courseId" element={<CourseDetailsView />} />
                      <Route path="/courses/view/:courseId/:moduleId" element={<ModuleDetailsView />}/>
                <Route path="/find" element={<SearchRecipe />} />
                <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/favorites" element={<FavoriteCoursePage />} />
                    <Route path="/dashboard/favorites/confirm" element={<FavoriteCourseConfirmationPage />} />
                <Route path="/feedback" element={<CourseFeedback />} />
                <Route path="/" element={<LogIn />} />
              </Routes>
            </Router>
          </FavoriteContext.Provider>
        </CourseContext.Provider>
    </LoginContext.Provider>
  );
}


export default App;

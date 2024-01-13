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
import UserDetails from './components/UserAccountPage';
// import EditUserDetails from './components/EditPage';

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
  const [courses, setCourses] = useState([]);
  console.log(courses);
  const [refreshKey, setRefreshKey] = useState(0);
  //Absolutely not sure if this is the best or most efficient way to do this, but it's what I've got figured out for now!
  const updateApp = () => {
    console.log(`updating app prev: ${refreshKey}`);
    setRefreshKey(prevKey => prevKey + 1);
    console.log(`updating app next: ${refreshKey}`);
  };

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [refreshKey]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/create" element={<CreateCourse updateApp={updateApp} />} />
        <Route path="/courses/modules/create" element={<CreateModule updateApp={updateApp} />} />
        <Route path="/courses" element={<ViewCourses />} />
        <Route path="/find" element={<SearchRecipe />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/feedback" element={<CourseFeedback />} />
        <Route path="/" element={<LogIn />} />
        {courses.map(course => (
          <Route key={course.id} path={`courses/view/${course.id}`} element={<CourseDetailsView id={course.id} updateApp={updateApp} />} />
        ))}
      </Routes>
    </Router>
  );
}


export default App;

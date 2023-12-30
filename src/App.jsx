import { useState } from 'react'
import './App.css';
//import CreateAccountForm from './components/CreateAccountForm';
// import HorizontalExample from './components/HorizontalFormExample';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import CourseCard from './components/CourseCard';
//import Container  from 'react-bootstrap/Container';
import LogIn from './components/LogIn';
import Register from './components/Register';
import CreateCourse from './components/CreateCourseForm';
import ViewCourses from './components/ViewAllCourses';

//Done: Build CourseCard component
//Done: Build Menu component
//Done: Build Sign up component
//Done: Build Login component
//TODO: Build Hero component
//TODO: Write about content
//TODO: Build Account Management screen
//TODO: Build CoursePage screen
//TODO: Build CourseCompletion screen
//TODO: Build Search screen
//In progress: Build AddCourse screen
//Done: Set routes using react-router Set useState variables to refresh page based on menu items clicked



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/view-all-courses" element={<ViewCourses />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </Router>
  );
}


export default App

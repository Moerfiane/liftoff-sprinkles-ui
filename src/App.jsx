import { useState } from 'react'
import './App.css'
import CreateAccountForm from './components/CreateAccountForm'
import HorizontalExample from './components/HorizontalFormExample'
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseCard from './components/CourseCard';
import Container  from 'react-bootstrap/Container';

//Done: Build CourseCard component
//TODO: Build Menu component
//TODO: Build Sign up component
//TODO: Build Login component
//TODO: Build Hero component
//TODO: Write about content
//TODO: Build Account Management screen
//TODO: Build CoursePage screen
//TODO: Build CourseCompletion screen
//TODO: Build Search screen
//TODO: Build AddCourse screen
//TODO: Figure out how bootstrap is calculating width by comparing HorizontalExample to CreateAccountForm
//TODO: Set useState variables to refresh page based on menu items clicked

function App() {

  return (
    <Container>
      <CreateAccountForm />
    </Container>
  )
}

export default App

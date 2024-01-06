import Navigation from './Navbar';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { sendData } from '../utilities/sendData';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

//Done: Make match Sukanya's
//TODO: If add module button is clicked append new module component with incremental numbers
//TODO: Pre-populate tools / ingredients similar to skills in techjobspersistent
    //TODO: auto-populate tags box -- look up this code
//TODO: "Add step" button similar to add module -- do this for tools and ingredients too?
//TODO: Add image select
//Done: Add handle submit
//Done: Hook up to backend

const ModuleForm = ({handleChange, handleClick}) => {
    return (
        <>
            <h2 className="fw-bold mb-1 text-uppercase">Add a Module</h2>
            <h3 className="mb-5">Course Title</h3>
            <Form.Group className="mb-1 mt-4" controlId="formCourseTitle">
                <Form.Label className="text-center">
                    Module Title
                </Form.Label>
                <Form.Control type="text" placeholder="Enter a course title" />
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleDescription">
                <Form.Label className="text-center">
                    Module Description
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter a description"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleTools">
                <Form.Label className="text-center">
                    Module Tools
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter a list of tools"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleIngredients">
                <Form.Label className="text-center">
                    Module Ingredients
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter a list of Ingredients"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleNotes">
                <Form.Label className="text-center">
                    Module Notes
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter any notes relevant to the recipe"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleSteps">
                <Form.Label className="text-center">
                    Module Steps
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter the steps of the recipe"></Form.Control>
            </Form.Group>
            <div className="d-grid mt-5">
                <Button variant="primary" type="submit" name="addModule" onClick={handleClick}>
                    Add Module
                </Button>
            </div>
        </>
    )
}


export default function CreateCourse() {
    //TODO: If protected, add logic to make backend request to do authentication check
    //TODO: Research react-router to see if you can have it do that check before loading
    //TODO: Does not accept null course data
    const [courseData, setCourseData] = useState({
        courseTitle:'',
        courseDescription:'',
        courseDifficulty:''
    });
    const navigate = useNavigate();
    //triggers display of new module form after course is submitted
    const [showModuleForm, setShowModuleForm] = useState(false);
    //storage for course data as new modules are added
    // const wholeCourseData = new Object;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      
      //TODO: DRY this code
    const handleClick = async (e) => {
        event.preventDefault(); 

    //checks what the button clicked is; if it's courseForm or addModule, it will display another addModule form, otherwise Navigate to courses
    //Should this be targeted elsewhere and call handleSubmit(e)? 
    //TODO: set courseId to the object storing the relationships, wholeCourseId
    //TODO: figure out submission
        if (e.target.name == "courseForm" || e.target.name == "addModule") {
            setShowModuleForm(true);} 
            else {
                navigate("/courses");
            }

        try {
          console.log(courseData);
          const response = await fetch('http://localhost:8080/courses/create', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
           });
         
          const data = await response.json();
          console.log(data.courseId);
    
          if (data.success) {
            console.log(data.message);
          } else {
            alert('Course creation failed: ' + data.message); 
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('An error occurred during course creation');
        }
    };




  return (
    <>
        <Navigation />
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col xs={6} md={8} lg={12}>
                    <Card>
                        <Card.Body>
                        <div className="mb-3 mt-4">
                        {showModuleForm ? (
                            <ModuleForm handleChange={handleChange} handleClick={handleClick} />
                        ) : (
                            <CourseForm handleChange={handleChange} handleClick={handleClick} />)}
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  );
}


const CourseForm = ({handleChange, handleClick}) => {
    return (
        <>
            <h2 className="fw-bold mb-5 text-uppercase">Create a course</h2>
            <Form className="mb-3">
                <Form.Group className="mb-1 mt-4" controlId="formCourseTitle">
                    <Form.Label className="text-center">
                        Course Title
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter a course title" name="courseTitle" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-1 mt-4" controlId="formCourseDescription">
                    <Form.Label className="text-center">
                        Course Description
                    </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter a description" name="courseDescription" onChange={handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 mt-4" controlId="formCourseDifficulty">
                    <Form.Label className="text-center">
                        Course Difficulty
                    </Form.Label>
                    <Form.Select name="courseDifficulty" onChange={handleChange}>
                        <option>Select a difficulty</option>
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advanced</option>
                    </Form.Select>
                </Form.Group>
                <div className="d-grid mt-5">
                    <Button variant="primary" type="submit" name="courseForm" onClick={handleClick}>Next</Button>
                </div>
            </Form>
        </>
    )
}
import Navigation from './Navbar';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { sendData } from '../utilities/sendData';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


//TODO: Pre-populate tools / ingredients similar to skills in techjobspersistent
//TODO: auto-populate tags box -- look up this code
//TODO: "Add step" button similar to add module -- do this for tools and ingredients too?
//TODO: Add image select
//TODO: Do not accept null course data
//TODO: If protected, add logic to make backend request to do authentication check
//TODO: Research react-router to see if you can have it do authentication check before loading /create
//Done: Add handle submit
//Done: Hook up to backend
//Done: Make match Sukanya's
//Done: If next button is clicked append new module

let mainCourseId;

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
                <Form.Control as="textarea" placeholder="Enter a description" onChange={(e) => handleChange(e, "module")}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleTools">
                <Form.Label className="text-center">
                    Module Tools
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter a list of tools" onChange={(e) => handleChange(e, "module")}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleIngredients">
                <Form.Label className="text-center">
                    Module Ingredients
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter a list of Ingredients" onChange={(e) => handleChange(e, "module")}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleNotes">
                <Form.Label className="text-center">
                    Module Notes
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter any notes relevant to the recipe" onChange={(e) => handleChange(e, "module")}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleSteps">
                <Form.Label className="text-center">
                    Module Steps
                </Form.Label>
                <Form.Control as="textarea" placeholder="Enter the steps of the recipe" onChange={(e) => handleChange(e, "module")}></Form.Control>
            </Form.Group>
            <div className="d-grid mt-5">
                <Button variant="primary" type="submit" name="addModule" onClick={(e) => handleClick(e, "module")}>
                    Add Module
                </Button>
            </div>
        </>
    )
}


export default function CreateCourse() {

    const [courseData, setCourseData] = useState({
        courseTitle:'',
        courseDescription:'',
        courseDifficulty:''
    });

    const [moduleData, setModuleData] = useState({
        moduleTitle:'',
        moduleDescription:'',
        moduleDifficulty:''
    });

    const navigate = useNavigate();
    //triggers display of new module form after course is submitted
    const [showModuleForm, setShowModuleForm] = useState(false);
    const handleChange = (e, formType) => {
        const { name, value } = e.target;

        //TODO: DRY this code
        if (formType = "course") {
            setCourseData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
        } else {
            setModuleData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
        }
      };
      
      //TODO: DRY this code
    const handleClick = async (e, formType) => {
        e.preventDefault(); 

    //TODO: set courseId to the object storing the relationships, wholeCourseId
    //Done: figure out submission
        if (e.target.name == "courseForm" || e.target.name == "addModule") {
            setShowModuleForm(true);
        } else {
            navigate("/courses");
        }
        handleSubmit(e, formType);
    };

    //TODO: DRY this code even further
    const handleSubmit = async (e, formType) => {
    /*
        ONCLICK LOGIC
        When a user click's the NEXT button on course, it should:
            1) DONE: setShowModule to true
            2) DONE: courseData to the backend
            3) DONE: set courseId to what's returned from data response
        When a user clicks the ADD MODULE button on module, it should:
            1) DONE: setShowModule to true
            2) DONE: send moduleData to the backend
        When a user clicks the DONE button on moudle, it should:
            1) DONE:  navigate to /courses
            2) DONE: send moduleData to the backend
    */
        let path;
        const method = 'POST';
        const headers = {'Content-Type': 'application/json'};
        let body;

        if (formType = "course") {
            path = "/courses/create";
            body = courseData;
            let response = await sendData(path, method, headers, body);
            mainCourseId = response.courseId;
        } else if (formType="module") {
            path = "/courses/modules/create";
            body = moduleData;
            sendData(path, method, headers, body);
        }
        
        
    }




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
                    <Form.Control type="text" placeholder="Enter a course title" name="courseTitle" onChange={(e) => handleChange(e, "course")} />
                </Form.Group>
                <Form.Group className="mb-1 mt-4" controlId="formCourseDescription">
                    <Form.Label className="text-center">
                        Course Description
                    </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter a description" name="courseDescription" onChange={(e) => handleChange(e, "course")}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 mt-4" controlId="formCourseDifficulty">
                    <Form.Label className="text-center">
                        Course Difficulty
                    </Form.Label>
                    <Form.Select name="courseDifficulty" onChange={(e) => handleChange(e, "course")}>
                        <option>Select a difficulty</option>
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advanced</option>
                    </Form.Select>
                </Form.Group>
                <div className="d-grid mt-5">
                    <Button variant="primary" type="submit" name="courseForm" onClick={(e) => handleClick(e, "course")}>Next</Button>
                </div>
            </Form>
        </>
    )
}
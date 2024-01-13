import Navigation from './Navbar';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { sendData } from '../utilities/sendData';
import { useNavigate } from 'react-router-dom';

//PRIORITY
//TODO: Format Module form to match backend data structures
//TODO: Do not accept null course data
//**TODO: If protected, add logic to make backend request to do authentication check
//**TODO: Research react-router to see if you can have it do authentication check before loading /create

//STRETCH
//TODO: Add image select
//TODO: Pre-populate tools / ingredients similar to skills in techjobspersistent
//TODO: auto-populate tags box -- look up this code
//TODO: "Add step" button similar to add module -- do this for tools and ingredients too?

//DONE
//Done: Add handle submit
//Done: Hook up to backend
//Done: Make match Sukanya's
//Done: If next button is clicked append new module

export default function CreateCourse() {

    const [courseData, setCourseData] = useState({
        courseTitle:'',
        courseDescription:'',
        courseDifficulty:''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
      };
      
      //TODO: DRY this code
    const handleClick = async (e) => {
        e.preventDefault(); 
        let response = await sendData('/courses/create', 'POST', {'Content-Type': 'application/json'}, courseData);
        navigate("/courses/modules/create", {state: response.courseId});
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
                            <CourseForm handleChange={handleChange} handleClick={handleClick} />
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
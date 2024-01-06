import Navigation from './Navbar';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { sendData } from '../utilities/sendData';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const ModuleForm = ({handleChange, handleClick}) => {
    return (
        <>
            <h2 className="fw-bold mb-1 text-uppercase">Add a Module</h2>
            <h3 className="mb-5">Course Title</h3>
            <Form.Group className="mb-1 mt-4" controlId="formCourseTitle">
                <Form.Label className="text-center">
                    Module Title
                </Form.Label>
                <Form.Control type="text" name="moduleTitle" placeholder="Enter a course title" />
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleDescription">
                <Form.Label className="text-center">
                    Module Description
                </Form.Label>
                <Form.Control as="textarea" name="moduleDescription" placeholder="Enter a description" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleTools">
                <Form.Label className="text-center">
                    Module Tools
                </Form.Label>
                <Form.Control as="textarea" name="moduleTools" placeholder="Enter a list of tools" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleIngredients">
                <Form.Label className="text-center">
                    Module Ingredients
                </Form.Label>
                <Form.Control as="textarea" name="moduleIngredients" placeholder="Enter a list of Ingredients" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleNotes">
                <Form.Label className="text-center">
                    Module Notes
                </Form.Label>
                <Form.Control as="textarea" name="moduleNotes" placeholder="Enter any notes relevant to the recipe" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleSteps">
                <Form.Label className="text-center">
                    Module Steps
                </Form.Label>
                <Form.Control as="textarea" name="moduleSteps" placeholder="Enter the steps of the recipe" onChange={handleChange}></Form.Control>
            </Form.Group>
            <div className="d-grid mt-5">
                <Button variant="primary" type="submit" name="addModule" onClick={handleClick}>
                    Add Module
                </Button>
            </div>
        </>
    )
}


export default function CreateModule() {
    const location = useLocation();
    const response = location.state;
    const [moduleData, setModuleData] = useState({
        courseId: response,
        moduleTitle:'',
        moduleDescription:'',
        moduleTools:'',
        moduleIngredients:'',
        moduleNotes:'',
        moduleSteps:'',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModuleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
      };

    const handleClick = async (e) => {
        e.preventDefault(); 

        if (e.target.name == "addModule") {
            navigate("/courses/modules/create");
        } else {
            navigate("/courses");
        }

        console.log(moduleData);

        // sendData('/courses/modules/create', 'POST', {'Content-Type': 'application/json'}, moduleData);
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
                            <ModuleForm handleChange={handleChange} handleClick={handleClick} />
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  );
}
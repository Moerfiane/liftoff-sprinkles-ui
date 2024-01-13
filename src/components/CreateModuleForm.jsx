import Navigation from './Navbar';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { sendData } from '../utilities/sendData';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

//TODO: Add category
export default function CreateModule({updateApp}) {
    const location = useLocation();
    const response = location.state;
    const initialModuleData = {
        courseId: response,
        name: '',
        description: '',
        tools: '',
        ingredients: '',
        notes: '',
        steps: '',
    };

    const [moduleData, setModuleData] = useState(initialModuleData);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(moduleData);
        setModuleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
      };

    const handleClick = async (e) => {
        e.preventDefault(); 

        if (e.target.name == "addModule") {
            navigate("/courses/modules/create", {state: response});
            setModuleData(initialModuleData);
        } else {
            updateApp();
            navigate("/courses");
        }

        console.log(moduleData);

        sendData('/courses/modules/create', 'POST', {'Content-Type': 'application/json'}, moduleData);
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
                            <ModuleForm handleChange={handleChange} handleClick={handleClick} moduleData={moduleData} />
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  );
}

const ModuleForm = ({handleChange, handleClick, moduleData}) => {
    return (
        <>
            <h2 className="fw-bold mb-1 text-uppercase">Add a Module</h2>
            <h3 className="mb-5">Course Title</h3>
            <Form.Group className="mb-1 mt-4" controlId="formCourseTitle">
                <Form.Label className="text-center">
                    Module Title
                </Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter a course title" value={moduleData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleDescription">
                <Form.Label className="text-center">
                    Module Description
                </Form.Label>
                <Form.Control as="textarea" name="description" placeholder="Enter a description" value={moduleData.description} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleTools">
                <Form.Label className="text-center">
                    Module Tools
                </Form.Label>
                <Form.Control as="textarea" name="tools" placeholder="Enter a list of tools" value={moduleData.tools} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleIngredients">
                <Form.Label className="text-center">
                    Module Ingredients
                </Form.Label>
                <Form.Control as="textarea" name="ingredients" placeholder="Enter a list of Ingredients" value={moduleData.ingredients} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleNotes">
                <Form.Label className="text-center">
                    Module Notes
                </Form.Label>
                <Form.Control as="textarea" name="notes" placeholder="Enter any notes relevant to the recipe" value={moduleData.notes} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 mt-4" controlId="formModuleSteps">
                <Form.Label className="text-center">
                    Module Steps
                </Form.Label>
                <Form.Control as="textarea" name="steps" placeholder="Enter the steps of the recipe" value={moduleData.steps} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Row className="mt-5">
                <Button variant="secondary" type="submit" name="addModule" onClick={handleClick}>
                    Add Another Module
                </Button>
            </Row>
            <Row className="mt-3">
                <Button variant="primary" type="submit" name="done" onClick={handleClick}>
                    Done
                </Button>
            </Row>
        </>
    )
}
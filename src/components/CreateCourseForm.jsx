import Navigation from './Navbar';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

//TODO: If add module button is clicked append new module component with incremental numbers
//TODO: Add image select
//TODO: Add handle submit
//TODO: Hook up to backend


export default function CreateCourse() {
  return (
    <>
        <Navigation />
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col xs={6} md={8} lg={12}>
                    <Card>
                        <Card.Body>
                        <div className="mb-3 mt-4">
                            <h2 className="fw-bold mb-5 text-uppercase">Create a course</h2>
                            <Form className="mb-3">
                                <Form.Group className="mb-1 mt-4" controlId="formCourseTitle">
                                    <Form.Label className="text-center">
                                        Course Title
                                    </Form.Label>
                                    <Form.Control type="text" placeholder="Enter a course title" />
                                </Form.Group>
                                <Form.Group className="mb-1 mt-4" controlId="formCourseDescription">
                                    <Form.Label className="text-center">
                                        Course Description
                                    </Form.Label>
                                    <Form.Control as="textarea" placeholder="Enter a description"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-4" controlId="formCourseDifficulty">
                                    <Form.Label className="text-center">
                                        Course Difficulty
                                    </Form.Label>
                                    <Form.Select>
                                        <option>Select a difficulty</option>
                                        <option value="0">Beginner</option>
                                        <option value="1">Intermediate</option>
                                        <option value="2">Advanced</option>
                                    </Form.Select>
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit">Submit</Button>
                                </div>
                            </Form>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    </>
  );
}

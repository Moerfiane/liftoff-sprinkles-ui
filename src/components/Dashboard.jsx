import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Navigation from './Navbar';
import { Container, Col, Card } from 'react-bootstrap';

const Dashboard = () => {

    const getEnrolledCourses = async () => {
        const response = await fetch('http://localhost:8080/user'); 
        const data = await response.json();
        return data.courses;
    };

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {

        getEnrolledCourses().then((courses) => setEnrolledCourses(courses));
    }, []);

    return (
        <>
        <Navigation />
            <Container>
            <div>
                <Col xs={6} md={8} lg={12}>
                    <Card>
                        <Card.Body>
                    <h2 className="fw-bold mb-5 text-uppercase">Currently Enrolled Courses</h2>
                        {enrolledCourses.length > 0 ? (
                            enrolledCourses.map((course) => (
                            <ProgressBar key={course.courseName} courseName={course.courseName} progress={course.progress} />
                            ))
                            ) : (
                            <p>You are not currently enrolled in any courses.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </div>
            </Container>
        </>
    );
};

export default Dashboard;
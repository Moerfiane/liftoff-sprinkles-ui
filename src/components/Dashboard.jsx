import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Navigation from './Navbar';
import { Container, Col, Card } from 'react-bootstrap';
import { sendData } from '../utilities/sendData';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const user = parseInt(localStorage.getItem('userId'));

    const data = {'userId': user};


    const getEnrolledCourses = async () => {
        let response = await sendData('/dashboard', 'POST', {'Content-Type': 'application/json'}, data );
        console.log(response.data);
        return response.data;
    };

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        getEnrolledCourses()
            .then((courses) => {
                setEnrolledCourses(courses);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching enrolled courses:', error);
                setLoading(false);
            });
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
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            enrolledCourses.length > 0 ? (
                                enrolledCourses.map((course) => (
                                    <ProgressBar key={course.courseName} courseName={course.courseName} progress={course.progress} />
                                ))
                            ) : (
                                <p>You are not currently enrolled in any courses.</p>
                            )
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
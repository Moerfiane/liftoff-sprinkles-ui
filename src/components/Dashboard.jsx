import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Navigation from './Navbar';
import { Container, Col, Card, Button } from 'react-bootstrap';
import { sendData } from '../utilities/sendData';
import UserDetails from './UserAccountPage';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [editingPassword, setEditingPassword] = useState(false);
    const user = parseInt(localStorage.getItem('userId'));

    const data = {userId : user};

    const getEnrolledCourses = async () => {
        try {
            let response = await sendData('/dashboard', 'POST', {'Content-Type': 'application/json'}, data );
            return response;
        } 
        catch (error) {
            console.error('Error fetching enrolled courses:', error);
            throw error;
        }
    };

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        getEnrolledCourses()
            .then((courses) => {
                setEnrolledCourses(courses.enrolledCourses);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching enrolled courses:', error);
                setLoading(false);
            });
    }, []);

    const editPassword = () => {
        setEditingPassword(true);
      };
    
      const updatePassword = () => {
        setEditingPassword(false);
      };
    
      const cancelPasswordEdit = () => {
        setEditingPassword(false);
      };

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
                                    <ProgressBar key={course.courseName} courseName={course.courseName} progress={course.courseProgress} />
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
            <Container>
                <div>
                {!editingPassword && (
                            <Button variant="primary" onClick={editPassword}>
                                Edit Password
                            </Button>
                        )}
                        {editingPassword && (
                            <UserDetails userId={user} onUpdate={updatePassword} onCancel={cancelPasswordEdit} />
                        )}
                </div>
            </Container>
        </>
    );
};

export default Dashboard;
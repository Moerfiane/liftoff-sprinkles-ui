import React, { useState, useEffect, useContext } from 'react';
import ProgressBar from './ProgressBar';
import Navigation from './Navbar';
import { Container, Col, Card, Button } from 'react-bootstrap';
import { sendData } from '../utilities/sendData';
import UserDetails from './UserAccountPage';
import DeleteUser from './DeleteUser';
import { LoginContext } from "../utilities/checkLogin";
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [editingPassword, setEditingPassword] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const user = parseInt(localStorage.getItem('userId'));
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
    const navigate = useNavigate();

    const data = {'userId': user};


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

      const confirmDeleteAccount = (userId) => {
        setUserToDelete(userId);
      };

      const cancelDeleteAccount = () => {
        setUserToDelete(null);
      };

    //   const handleDeleteAccount = async () => {
    //     try {
    //         await sendData(`/dashboard/${userId}/delete`, 'DELETE', { 'Content-Type': 'application/json' });
    //         setUserToDelete(null);
    //     } catch (error) {
    //         console.error('Error deleting account:', error);
    //     }
    //   };
    //   const handleDeleteAccount = () => {

        // setUserToDelete(null);
        // localStorage.removeItem("userId");
        // localStorage.removeItem("role");
    //     setIsLoggedIn(false);
    //     navigate('/login');
    //   };
      

    return (
        <>
        <Navigation />
            <Container>
            <div>
                <Col xs={6} md={8} lg={12} className="d-flex">
                    <Card className="mb-4">
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
                        <>
                            <Button variant="primary" onClick={editPassword}>
                                Edit Password
                            </Button>
                            {/* <Button variant="danger" onClick={() => confirmDeleteAccount(user)}>
                            Delete Account
                        </Button> */}

                        </>
                    )}
                    {editingPassword && (
                        <UserDetails userId={user} onUpdate={updatePassword} onCancel={cancelPasswordEdit} />
                    )}


            {userToDelete && (
                <DeleteUser userId={userToDelete} onCancel={cancelDeleteAccount} onAccountDeleted={DeleteUser.handleDeleteAccount} />
                
                
                // <div className="delete-confirmation text-center">
                //     <p>Are you sure you want to delete your account?</p>
                //     <Button variant="danger" onClick={handleDeleteAccount}>
                //     Yes, Delete Account
                //     </Button>
                //     <Button variant="secondary" onClick={cancelDeleteAccount}>
                //     Cancel
                //     </Button>
                // </div>
            )}
                            </div>
            </Container>
        </>
    );
};

export default Dashboard;
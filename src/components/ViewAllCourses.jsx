import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './Navbar';
import CourseCard from './CourseCard';

//TODO: Make container flex
//TODO: Import data from backend

const CourseList = ({ data, onEnroll }) => (
  <>
    {data.map((object) => (
      <CourseCard key={object.id} {...object} onEnroll={onEnroll} />
    ))}
  </>
);

const ViewCourses = () => {
  const [data, setData] = useState([
    { id: 1, title: 'Course 1', description: 'this is a description' },
    { id: 2, title: 'Course 2', description: 'this is a description' },
    { id: 3, title: 'Course 3', description: 'this is a description' },
  ]);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleEnrollment = async (courseId) => {
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if required
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        setFeedback({ message: 'Enrollment successful!', type: 'success' });
        // Optionally update the course list or user state here
      } else {
        throw new Error('Enrollment failed');
      }
    } catch (error) {
      setFeedback({ message: error.message, type: 'danger' });
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <h1>View All Courses</h1>
        {feedback.message && <Alert variant={feedback.type}>{feedback.message}</Alert>}
        <CourseList data={data} onEnroll={handleEnrollment} />
      </Container>
    </>
  );
};

export default ViewCourses;
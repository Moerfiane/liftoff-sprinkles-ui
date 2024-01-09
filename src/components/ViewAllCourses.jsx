import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import Navigation from './Navbar';
import CourseCard from './CourseCard';
// import getData from '../utilities/getData';


//TODO: Make container flex
//TODO: Import data from backend

const getData = async () => {
  try {
      const response = await fetch(`http://localhost:8080/courses`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          }, 
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Assuming response is JSON, adjust accordingly

      return data;
  } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error to propagate it up the call stack
  }
};

console.log(await getData());


const getData = async () => {
  try {
      const response = await fetch(`http://localhost:8080/courses`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          }, 
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Assuming response is JSON, adjust accordingly

      return data;
  } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error to propagate it up the call stack
  }
};

console.log(await getData());


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
      const response = await fetch('http://localhost:8080/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        setFeedback({ message: 'Enrollment successful!', type: 'success' });
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
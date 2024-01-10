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


const CourseList = ({ data }) => (
  <>
    {data.map((object) => (
      <CourseCard key={object.id} {...object} />
    ))}
  </>
);

const ViewCourses = () => {
  const [data, setData] = useState([
    { id: 1, title: 'Course 1', description: 'this is a description' },
    { id: 2, title: 'Course 2', description: 'this is a description' },
    { id: 3, title: 'Course 3', description: 'this is a description' },
  ]);

  return (
    <>
      <Navigation />
      <Container>
        <h1>View All Courses</h1>
        <CourseList data={data} />
      </Container>
    </>
  );
};

export default ViewCourses;
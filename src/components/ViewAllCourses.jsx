import React, {useState, useEffect, useContext} from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './Navbar';
import CourseCard from './CourseCard';
import { CourseContext } from '../utilities/checkCourses';
// import getData from '../utilities/getData';

//Done: Make container flex
//Done: Import data from backend
//TODO: Add context for enrollment button


const CourseList = ({ data }) => (
  <Container className="d-flex flex-wrap gap-3">
    {data.map((object) => (
      <CourseCard type="Course" key={object.id} {...object} />
    ))}
  </Container>
);

const ViewCourses = () => {
const { courses, setCourses, updateApp } = useContext(CourseContext);

useEffect(() => {
  const fetchData = async () => {
    try {
      await updateApp(); // 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []); 

  return (
    <>
        <Navigation />
        <Container>
            <h1>View All Courses</h1>
            <CourseList data={courses} />
        </Container>
    </>
  );
};

export default ViewCourses;

import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './Navbar';
import CourseCard from './CourseCard';

//TODO: Make container flex
//TODO: Import data from backend

const CourseList = ({ data }) => (
  <>
    {data.map((object) => (
      <CourseCard key={object.id} {...object} />
    ))}
  </>
);

const ViewCourses = () => {
  const data = [
    { id: 1, title: 'Course 1', description:'this is a description' },
    { id: 2, title: 'Course 2', description:'this is a description' },
    { id: 3, title: 'Course 3', description:'this is a description' },
  ];

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

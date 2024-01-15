import { useLocation, useMatch } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import Navigation from './Navbar.jsx';
import { Container } from 'react-bootstrap';
import ModuleCard from './ModuleCard.jsx'
import { CourseContext } from '../utilities/checkCourses';


const CourseDetailsView = ({ id }) => {
  const { courses, setCourses, updateApp } = useContext(CourseContext);
  const thisCourse = courses.find(course=>course.id === id);

  return (
    <>
        <Navigation />
        <Container>
            <h1>{thisCourse.name}</h1>
            <h2>Description</h2>
            <p>{thisCourse.description}</p>
            {console.log(thisCourse.modules)}
            <ModuleList data={thisCourse.modules} />
        </Container>
    </>
        
  );
};

const ModuleList = ({ data }) => (
    <Container className="d-flex flex-wrap gap-3" >
      {data && data.map((object) => (
        <ModuleCard key={object.id} {...object} />
      ))}
    </Container>
  );
export default CourseDetailsView;

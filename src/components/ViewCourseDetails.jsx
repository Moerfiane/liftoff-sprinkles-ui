import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import Navigation from './Navbar.jsx';
import { Container, Button, Card } from 'react-bootstrap';
import { CourseContext } from '../utilities/checkCourses';
import ModuleDetailsView from './ViewModuleDetails.jsx';

const CourseDetailsView = ({ id }) => {
  const { courses, setCourses, updateApp } = useContext(CourseContext);
  const thisCourse = courses.find(course=>course.id === id);
  const navigate = useNavigate();

  //TODO: send course object to ViewModuleDetails
  //TODO: navigate to /:moduleId on button click
  //TODO: Figure out to appropriately feed the link parameters
    //https://ui.dev/react-router-url-parameters

  return (
    <>
        <Navigation />
        <Container>
            <h1>{thisCourse.name}</h1>
            <h2>Description</h2>
            <p>{thisCourse.description}</p>
            {console.log(thisCourse.modules)}
            <ModuleList data={thisCourse.modules} />
            <Routes>
              <Route path="/:moduleId" element={<ModuleDetailsView />}/>
            </Routes>
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



function ModuleCard({id, name, description}) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    navigate(`/courses/view/${id}`, {state: id})
    }

  return (
    
        <Card style={{ width: '18rem' }} key={id}>
          <Card.Body className="d-flex flex-column h-100">
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
            <Button className='mt-auto' variant="primary" onClick={handleClick}>Start Module</Button>
          </Card.Body>
        </Card>
    
  );
}

export default CourseDetailsView;
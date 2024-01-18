import { Routes, Route, useNavigate, useParams} from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import Navigation from './Navbar.jsx';
import { Container, Button, Card } from 'react-bootstrap';
import { CourseContext } from '../utilities/checkCourses';
import ModuleDetailsView from './ViewModuleDetails.jsx';

const CourseDetailsView = () => {
  const { courseId } = useParams();

  const thisId = parseInt(courseId);
  const { courses, setCourses, updateApp } = useContext(CourseContext);
  const thisCourse = courses.find(course=>course.id === thisId);

  const navigate = useNavigate();

  //Done: send course object to ViewModuleDetails
  //Done: navigate to /:moduleId on button click
  //Done: Figure out to appropriately feed the link parameters
    //https://ui.dev/react-router-url-parameters

  const handleClick = () => {
    navigate("/dashboard/favorites/confirm", {state: thisId});
  }

  return (
    <>
        <Navigation />
        <Container>
            <h1>{thisCourse.name}</h1>
            <Button variant="light" className="mb-5" onClick={handleClick}><img src="/assets/noun-chef-hat.png" height="40px"></img>Add to favorites</Button>

            <h2>Description</h2>
            <p>{thisCourse.description}</p>
            {console.log(thisCourse.modules)}
            <ModuleList data={thisCourse.modules} courseId={thisCourse.id} />
            {/* <Routes>
              <Route path="/courses/view/:courseId/:moduleId" element={<ModuleDetailsView />}/>
            </Routes> */}
        </Container>
    </>
        
  );
};

const ModuleList = ({ data, courseId }) => (
    <Container className="d-flex flex-wrap gap-3" >
      {data && data.map((object) => (
        <ModuleCard key={object.id} {...object} thisModule={object} courseId={courseId}/>
      ))}
    </Container>
  );



function ModuleCard({id, name, description, thisModule, courseId}) {
  const navigate = useNavigate();
  const moduleId = id;
  const handleClick = (e) => {
    console.log("TRIGGERED HANDLE CLICK");
    e.preventDefault();
    console.log(thisModule);
    // navigate to /:moduleId where module id is a variable of id of module
    navigate(`/courses/view/${courseId}/${moduleId}`, {state: {thisModule}})
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
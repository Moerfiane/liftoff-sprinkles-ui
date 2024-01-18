import React, {useState, useEffect, useContext} from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Navigation from './Navbar';
import { CourseContext } from '../utilities/checkCourses';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../utilities/checkLogin';
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

function CourseCard({id, name, description, type}) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleClick = async (buttonId) => {
    if (buttonId === "enroll") {
      navigate(`/courses/enroll` , {state: id});
    } else if (buttonId === "login")  {
      navigate("/register");
    } else if (buttonId === "details") {
      navigate(`/courses/view/${id}`, {state: id});
    }
  }
 
  return (
    <Card style={{ width: '18rem' }} key={id} className="mb-3 mt-3">
      <Card.Img variant="top" src="assets/egg.jpg" />
      {/* Photo by <a href="https://unsplash.com/@mustafabashari?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mustafa Bashari</a> on <a href="https://unsplash.com/photos/white-egg-lot-on-brown-wooden-table-rKUK4EB8F7s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
  
      <Card.Body className="d-flex flex-column h-100">
        <div className="flex-grow-1">
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
        </div>
        <div className="d-flex flex-column mt-4 gap-3">
          {isLoggedIn ? <Button variant="success" onClick={() => handleClick("enroll")}>Enroll</Button> : <Button variant="secondary" onClick={() => handleClick("login")}>Login to enroll</Button>}
          <Button className="mt-auto" variant="secondary" onClick={() => handleClick("details")}>{type} details</Button>
        </div>
      </Card.Body>
    </Card>
  );
}


export default ViewCourses;
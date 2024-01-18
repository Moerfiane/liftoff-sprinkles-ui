import Navigation from "./Navbar";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { sendData } from "../utilities/sendData";
import { useState, useContext, useEffect} from "react";
import { LoginContext } from "../utilities/checkLogin";
import { FavoriteContext } from "../utilities/checkFavorites";

const FavoriteCoursePage = () => {
  // receive course clicked data from course details page
  // set state for show confirmation
  const { favoriteCourses, setFavoriteCourses } = useContext(FavoriteContext);
  const thisUserId = parseInt(localStorage.getItem('userId'));
  // once clicked send userid and course id to localhost:8080/favorites
  // if data is confirmed, set confirmation to hide, show course list & map data to course list

  //STILL TO DO
  // use Context API to set favorites
  // HOW am i going to make sure that the favorites data loads? different path?
  //needed to initialize to empty array

  const data = {
    courseId: null,
    userId: thisUserId,
  }

  useEffect(()=> {
    const getFavoriteCourses = async () => {
      let response = await sendData('/dashboard/favorite', 'POST', {'Content-Type': 'application/json'}, data);

      let thisData = await response.data;
      //getting error response is not defined
      if (response.success) {
          setFavoriteCourses(thisData);
      } else {
        console.log("Error", response.message);
      }
    };
    getFavoriteCourses();
  }, [])


  return (
    <>
      <Navigation/>
      <Container>
        <h1>My Favorite Courses</h1>
        <CourseList data={favoriteCourses}/>
    </Container>
    </>
  )
}

const CourseList = ({ data }) => {
  return (
    <Container className="d-flex flex-wrap gap-3">
      {data.map(point => (
        <CourseCard key={point.id} id={point.id} name={point.name} description={point.description} />
      ))}
    </Container>
)};

export default FavoriteCoursePage;


function CourseCard({id, name, description }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

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
      <Card.Img variant="top" src="/assets/egg.jpg" />
      {/* Photo by <a href="https://unsplash.com/@mustafabashari?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mustafa Bashari</a> on <a href="https://unsplash.com/photos/white-egg-lot-on-brown-wooden-table-rKUK4EB8F7s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
      <Card.Body className="d-flex flex-column h-100">
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        {isLoggedIn ? <Button variant="secondary" onClick={() => handleClick("enroll")}>Enroll</Button> : <Button variant="secondary" onClick={() => handleClick("login")}>Login to enroll</Button>}
        <Button className="mt-auto" variant="primary" onClick={() => handleClick("details")}>Course details</Button>
      </Card.Body>
    </Card>
  );
}


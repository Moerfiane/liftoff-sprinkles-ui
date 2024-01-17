import Navigation from "./Navbar";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { sendData } from "../utilities/sendData";
import { useState } from "react";


const FavoriteCoursePage = () => {
  // receive course clicked data from course details page
  // set state for show confirmation
  const [confirmation, setConfirmation ] = useState(false);
  const location = useLocation();
  const thisCourseId = location.state;
  const thisUserId = parseInt(localStorage.getItem('userId'));
  // once clicked send userid and course id to localhost:8080/favorites?? 
  // if data is confirmed, set confirmation to hide, show course list & map data to course list

  // use Context API to set favorites
  // HOW am i going to make sure that the favorites data loads? different path?
  
  const [show, setShow] = useState(false);
  const [alertBody, setAlertBody] = useState('');

  const data = {
    courseId: thisCourseId,
    userId: thisUserId,
  }

  const handleFavorite = async (e) => {
    e.preventDefault();
    setConfirmation(true);
    console.log(`data: ${data}`);
    let response = await sendData('/dashboard/favorite', 'POST', {'Content-Type': 'application/json'}, data);
    console.log(`response: ${response.data}`);
    if (response.success) {
        console.log("yaaaay bitch")
    } else {
      setAlertBody("An error occurred while favoriting the course");
      setShow(true);
    }
  }

  return (
    <>
      <Navigation/>
      {!confirmation ? (
        <FavoriteCourseConfirmation handleFavorite={handleFavorite}/>
      ) : ((
            <h2>put some shit here</h2>
      ))}
      <Alert className="mt-5" show={show} variant="warning">{alertBody}</Alert>
      {/* 
        for each course in favoriteCourses
        return a CourseCard w/ link to Course Data
      */}

    </>
  )

}


const FavoriteCourseConfirmation = ({handleFavorite}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  }

  return (
    <>
      <Container className="vh-100 vw-100 d-flex justify-content-center">
        <Row className="mt-5 d-flex justify-content-center">
          <Col md={8} lg={6} xs={12} className="d-flex flex-column align-items-center">
            <Card className="shadow" style={{ width: '18rem' }}>
              <h2 className="fw-bold m-2 text-uppercase">Favorite this Course</h2>
              <p className="m-3">Are you sure you want to add this course to your favorites?</p>
              <div className="d-grid m-3">
                <Button className="mb-3 mt-3" variant="primary" onClick={handleFavorite}>Add to Favorites</Button>
                <Button variant="danger" onClick={handleClick}>Cancel</Button>
              </div>
            </Card>
            
        </Col>
        </Row>
    </Container>
    </>
)
}

export default FavoriteCoursePage;
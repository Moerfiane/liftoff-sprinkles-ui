import Navigation from "./Navbar";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { sendData } from "../utilities/sendData";
import { useState, useContext} from "react";
import { LoginContext } from "../utilities/checkLogin";

const FavoriteCoursePage = () => {
  // receive course clicked data from course details page
  // set state for show confirmation
  const [confirmation, setConfirmation ] = useState(false);
  const location = useLocation();
  const thisCourseId = location.state;
  const thisUserId = parseInt(localStorage.getItem('userId'));
  // once clicked send userid and course id to localhost:8080/favorites?? 
  // if data is confirmed, set confirmation to hide, show course list & map data to course list

  //STILL TO DO
  // use Context API to set favorites
  // HOW am i going to make sure that the favorites data loads? different path?
  
  const [show, setShow] = useState(false);
  const [alertBody, setAlertBody] = useState('');
  const [courseData, setCourseData] = useState([]);

  const data = {
    courseId: thisCourseId,
    userId: thisUserId,
  }

  const handleFavorite = async (e) => {
    e.preventDefault();
    setConfirmation(true);
    let response = await sendData('/dashboard/favorite', 'POST', {'Content-Type': 'application/json'}, data);

    let thisData = await response.data;
    console.log(`${thisData}`);
    thisData.forEach(point=> {
      console.log(point.id);
      console.log(point.name);
      console.log(point.description)
    })
    //getting error response is not defined
    if (response.success) {

        setCourseData(thisData);
        console.log(`${courseData}`)
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
        <CourseList data={courseData}/>
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

const CourseList = ({ data }) => {
  console.log(data);
  data.forEach(point => {
    // <CourseCard id={point.id} name={point.name} description={point.description} />
    console.log(`response id: ${point.id}`);
    console.log(`response name: ${point.name}`);
    console.log(`response difficulty: ${point.difficulty}`);
  });
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


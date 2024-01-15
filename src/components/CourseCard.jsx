import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import {useState, useContext} from "react";
import { LoginContext } from '../utilities/checkLogin';


//Done: Add props that will translate from a JSON file
//Done: Props should include course title
//Done: Props should include course description
//Done Props should include relative URL to course details page that links to course id
//Done: Build corresponding backend structure to export

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
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        {isLoggedIn ? <Button variant="secondary" onClick={() => handleClick("enroll")}>Enroll</Button> : <Button variant="secondary" onClick={() => handleClick("login")}>Login to enroll</Button>}
        <Button className="mt-auto" variant="primary" onClick={() => handleClick("details")}>{type} details</Button>
      </Card.Body>
    </Card>
  );
}


export default CourseCard;

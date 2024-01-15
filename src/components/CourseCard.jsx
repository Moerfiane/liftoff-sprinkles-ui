import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


//Done: Add props that will translate from a JSON file
//Done: Props should include course title
//Done: Props should include course description
//Done Props should include relative URL to course details page that links to course id
//Done: Build corresponding backend structure to export

function CourseCard({id, name, description, type}) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    navigate(`/courses/view/${id}`, {state: id})
    }

const userId = 1;
  const handleEnrollment = async (course, user) => {
    try {
      const response = await fetch('http://localhost:8080/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course, user }),
      });

      if (response.ok) {
        console.log(response.message);
      } else {
        throw new Error('Enrollment failed');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

//TODO: update hard coded data in handle enrollment
  return (
    <Card style={{ width: '18rem' }} key={id} className="mb-3 mt-3">
      <Card.Img variant="top" src="assets/egg.jpg" />
      {/* Photo by <a href="https://unsplash.com/@mustafabashari?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mustafa Bashari</a> on <a href="https://unsplash.com/photos/white-egg-lot-on-brown-wooden-table-rKUK4EB8F7s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
  
      <Card.Body className="d-flex flex-column h-100">
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        {/* <Button variant="primary">Course details</Button> */}
        <Button variant='secondary' onClick={() => handleEnrollment(id, userId)}>Enroll</Button>
        <Button className="mt-auto" variant="primary" onClick={handleClick}>{type} details</Button>
      </Card.Body>
    </Card>
  );
}



export default CourseCard;

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

//Done: Add props that will translate from a JSON file
//Done: Props should include course title
//Done: Props should include course description
//TODO: Props should include relative URL to course details page that links to course id
//TODO: Build corresponding backend structure to export

function CourseCard({id, name, description}) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    navigate(`/courses/view/${id}`, {state: id})
    }

  return (
    <Card style={{ width: '18rem' }} key={id} className="mb-3 mt-3">
      <Card.Img variant="top" src="assets/egg.jpg" />
      {/* Photo by <a href="https://unsplash.com/@mustafabashari?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mustafa Bashari</a> on <a href="https://unsplash.com/photos/white-egg-lot-on-brown-wooden-table-rKUK4EB8F7s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
  
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="primary" onClick={handleClick}>Course details</Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
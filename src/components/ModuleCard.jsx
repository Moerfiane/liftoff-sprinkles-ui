import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

//Done: Add props that will translate from a JSON file
//Done: Props should include course title
//Done: Props should include course description
//TODO: Props should include relative URL to module page that links to course id
//TODO: Need to add enrollment check and change the options on buttons

function ModuleCard({id, name, description}) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    navigate(`/courses/view/${id}`, {state: id})
    }

  return (
    <Card style={{ width: '18rem' }} key={id} className="mb-3 mt-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="primary" onClick={handleClick}>Start Module</Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
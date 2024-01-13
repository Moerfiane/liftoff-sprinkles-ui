import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row,Col } from 'react-bootstrap';
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

export default ModuleCard;
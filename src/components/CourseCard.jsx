import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//TODO: Add props that will translate from a JSON file
//TODO: Props should include course title
//TODO: Props should include course description
//TODO: Props should include relative URL to course details page
//TODO: Build corresponding backend structure to export

function CourseCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="assets/egg.jpg" />
      {/* Photo by <a href="https://unsplash.com/@mustafabashari?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mustafa Bashari</a> on <a href="https://unsplash.com/photos/white-egg-lot-on-brown-wooden-table-rKUK4EB8F7s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
  
      <Card.Body>
        <Card.Title>Course Title</Card.Title>
        <Card.Text>
          Text here should describe the course.
        </Card.Text>
        <Button variant="primary">Course details</Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
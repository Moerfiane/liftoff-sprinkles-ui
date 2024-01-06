import React from 'react';
import { Button, Card } from 'react-bootstrap';

function Course({ title, description, onEnroll }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={onEnroll}>Enroll</Button>
      </Card.Body>
    </Card>
  );
}

export default Course;
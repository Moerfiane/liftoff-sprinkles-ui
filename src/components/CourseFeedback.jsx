import React, { useEffect,useState } from 'react';
import { Form, Button, Container, Col, Card, ListGroup } from 'react-bootstrap';

export default function FeedbackForm() {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState({});
    const [feedbackList, setFeedbackList] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
      if (!isFetched) {
        fetchFeedback();
        setIsFetched(true);
      }
    }, [isFetched]);
    
    
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:8080/feedback');
        const data = await response.json();
        setFeedbackList(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      let newErrors = {};
  
      // Validation
      if (!name.trim()) newErrors.name = 'Name is required';
      if (!comment.trim()) newErrors.comment = 'Comment is required';
      if (!rating) newErrors.rating = 'Rating is required';
  
      if (Object.keys(newErrors).length === 0) {
          console.log('Feedback Submitted:', { name, comment, rating });
          try {

            const response = await fetch('http://localhost:8080/feedback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, comment, rating }),
            });
      
            const data = await response.json();
            console.log('Response Body:', data);
            
            if (data.id) {
              // Refresh the feedback list
              setIsFetched(false);
              fetchFeedback(); 

              alert('Thank you for your feedback!');
            } else {
            }
          } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration');
          }
  
          // Reset form fields and errors
          setName('');
          setComment('');
          setRating('');
          setErrors({}); // Reset errors
      } else {
          setErrors(newErrors);
      }
  };
  

    return (
        <Container className="mt-5">
            <h4>Feedback</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your name" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicComment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Your comment" 
                        value={comment} 
                        onChange={e => setComment(e.target.value)} 
                        isInvalid={!!errors.comment}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.comment}
                    </Form.Control.Feedback>
                </Form.Group>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={rating} 
                            onChange={e => setRating(e.target.value)}
                            isInvalid={!!errors.rating}
                        >
                            <option value="">Select a rating</option>
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Below Average</option>
                            <option value="1">1 - Poor</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.rating}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Button variant="primary" type="submit"  className='mb-5'>
                    Submit Feedback
                </Button>
            </Form>
            {[...feedbackList].reverse().map((feedback, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>Feedback from {feedback.name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Comment:</strong> {feedback.comment}</ListGroup.Item>
                    <ListGroup.Item><strong>Rating:</strong> {feedback.rating}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
        </Container>
    );
}

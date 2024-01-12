import React from "react";
import Navigation from './Navbar';
import { Button, Container, Form} from 'react-bootstrap';

function EditUserDetails () {
    return (
        <>
        <Navigation />
        <Container className="mt-5">
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" defaultValue="MyAwesomeUsername" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue="myAwesomeEmail@email.com" />
                </Form.Group>
                <Button variant="primary" type="submit">Save Changes</Button>
                <Button variant="secondary">Cancel</Button>
            </Form>
        </Container>
        </>
    );
}

export default EditUserDetails;
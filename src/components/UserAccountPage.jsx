import Navigation from './Navbar';
import { Button, Container, Table } from 'react-bootstrap';
function UserDetails() {
  return (
    <>
        <Navigation />
        <Container className="mt-5"> 
            <Table striped hover>
            <thead>
                <tr>
                <th>Field</th>
                <th>Value</th>
                <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Username</td>
                <td>myAwesomeUsername</td>
                <td><Button variant="primary">Edit</Button></td>
                </tr>
                <tr>
                <td>Password</td>
                <td>**********</td>
                <td><Button variant="primary">Edit</Button></td>
                </tr>
                <tr>
                <td>E-mail</td>
                <td>myAwesomeEmail@email.com</td>
                <td><Button variant="primary">Edit</Button></td>
                </tr>
            </tbody>
            </Table>
        </Container>
    </>
  );
}
export default UserDetails;
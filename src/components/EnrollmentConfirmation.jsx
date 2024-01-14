import Navigation from "./Navbar";
import { Card, Button} from "react-bootstrap";

const ConfirmationPage = ({courseId, courseTitle}) => {
  const handleEnrollment = () => {
    
  }

    return (
        <>
            <Navigation />
            <Card>
                <h1>Are you sure you want to enroll in {courseTitle}?</h1>
            </Card>
            <Button className="primary" onClick={handleEnrollment}>Enroll me!</Button>
            <Button className="secondary">Nevermind</Button>
        </>
    )
}
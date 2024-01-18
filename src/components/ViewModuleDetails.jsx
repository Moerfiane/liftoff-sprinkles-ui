import { Navbar, Button, Container, Alert } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, state, useState } from "react";
import { CourseContext } from "../utilities/checkCourses";
import Navigation from "./Navbar";
import { sendData } from "../utilities/sendData";
import FeedbackForm from "./CourseFeedback";



const ModuleDetailsView = () => {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();
    // const location = useLocation();
    const { state } = useLocation();
    const user = localStorage.getItem('userId');
    const thisModule = state?.thisModule;
    const course = thisModule.courseId;
    const [alertBody, setAlertBody] = useState('');
    const [show, setShow] = useState(false);

    console.log(thisModule);

    const completeModule = async (e) => {
        e.preventDefault();

        const data = { 
            moduleId, 
            // courseId: course, 
            userId: parseInt(user), 
        };

        try {
        let response = await sendData('/dashboard/complete-module', 'POST', {'Content-Type': 'application/json'}, data);
        console.log(response);
        if (response.success) {
          navigate(-1);
        } else {
          setAlertBody("There was an issue marking the module as completed.");
          setShow(true);
        }
      } catch (error) {
        console.error('Error completing module:', error);
        setAlertBody("There was an unexpected error");
        setShow(true);
      }
    }

    return(
        <>
            <Navigation />
            <Container>
                <h2>{thisModule.name}</h2>
                <p>{thisModule.description}</p>
                <p>{thisModule.ingredients}</p>
                <p>{thisModule.steps}</p>
                <p>{thisModule.tools}</p>
                <p>{thisModule.notes}</p>
                <Button onClick={completeModule}>Done!</Button>
            </Container>
            <Container>
              <FeedbackForm/>
            </Container>
        </>
    )
}

export default ModuleDetailsView;
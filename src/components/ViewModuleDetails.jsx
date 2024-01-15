import { Navbar, Button, Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CourseContext } from "../utilities/checkCourses";
import Navigation from "./Navbar";



const ModuleDetailsView = () => {
    const { courseId, moduleId } = useParams();
    const { state } = useLocation();
    const thisModule = state?.thisModule;
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
                <Button>Done!</Button>
            </Container>
        </>
    )
}

export default ModuleDetailsView;
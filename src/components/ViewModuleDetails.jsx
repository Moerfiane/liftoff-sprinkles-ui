import { Navbar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { CourseContext } from "../utilities/checkCourses";

// TODO: retrieve module data from courses
//TODO: Write 
const ModuleDetailsView = ({courseId}) => {
const [module, setModule] =useState(null);
const { courses, setCourses } = useContext(CourseContext);
const { moduleId } = useParams();

useEffect(() => {
    thisModule = 
})

    return(
        <>

        </>
    )
}

export default ModuleDetailsView;
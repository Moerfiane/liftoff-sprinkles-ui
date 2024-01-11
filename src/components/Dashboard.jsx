import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const Dashboard = () => {

    const getEnrolledCourses = async () => {
        const response = await fetch('http://localhost:8080/user'); // need to add API endpoint
        const data = await response.json();
        return data.courses;
    };

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {

        getEnrolledCourses().then((courses) => setEnrolledCourses(courses));
    }, []);

    return (
        <div>
            <h1>Currently Enrolled Courses</h1>
            {enrolledCourses.map((course) => (
                <ProgressBar key={course.courseName} courseName={course.courseName} progress={course.progress} />
            ))}
            </div>
    );
};

export default Dashboard;
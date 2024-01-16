import React from "react";

const ProgressBar = ({ courseName, courseProgress}) => {

    console.log(courseProgress);
    console.log(courseName);
    const progressBarWrapper = {
        width: '100%',
        height: '20px',
        backgroundColor: '#808080'
    }

    const progressBarStyle = {
        width: `${courseProgress}%`,
        height: '100%',
        backgroundColor: '#4caf50', // Green bar
    };

    return (
        // <div style="courseProgress">
        <div>
            <h3>{courseName}</h3>
            <div style={progressBarWrapper}>
                <div style={{ ...progressBarStyle, width: `${courseProgress}%` }}></div>
            </div>
            <p>Progress: {courseProgress}%</p>
        </div>
    );
};

export default ProgressBar;


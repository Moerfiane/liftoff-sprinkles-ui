import React from "react";

const ProgressBar = ({ courseName, progress}) => {

    const progressBarWrapper = {
        width: '100%',
        height: '20px',
    }

    const progressBarStyle = {
        width: '${progress}%',
        height: '100%',
        backgroundColor: '#4caf50', // Green bar
    };

    return (
        // <div style="courseProgress">
        <div>
            <h3>{courseName}</h3>
            <div style={progressBarWrapper}>
                <div style={progressBarStyle}></div>
            </div>
            <p>Progress: {progress}%</p>
        </div>
    );
};

export default ProgressBar;


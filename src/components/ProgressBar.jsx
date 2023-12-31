const ProgressBar = ({ courseName, progress}) => {

    const progressBarStyle = {
        width: '${progress}%',
        height: '20px',
        backgroundColor: '#4caf50', // Green bar
    };

    return (
        <div className="courseProgress">
            <h3>{courseName}</h3>
            <div className="progress-bar-wrapper">
                <div className="progress-bar"></div>
            </div>
            <p>Progress: {progress}%</p>
        </div>
    );
};

export default ProgressBar;


import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UnenrollButton = ({ userId, courseId }) => {
    const { courseId, userId } = useParams();
  const navigate = useNavigate();

  const handleUnenroll = async () => {
    try {
      const response = await fetch(`/unenroll/${userId}/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        console.log("Unenrolled successfully");
        navigate("/courses");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error unenrolling from course', error);
    }
  };

  return (
    <button onClick={handleUnenroll}>Unenroll</button>
  );
};

export default UnenrollButton;
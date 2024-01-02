//TODO: make this work for any path
//NOTE: currently redirecting to login screen
const sendCourseData = async (data) => {
  
    try {
      const response = await fetch('http://localhost:8080/courses/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  
  export {sendCourseData};
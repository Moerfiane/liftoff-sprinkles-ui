//TODO: make this work for any path
//NOTE: currently redirecting to login screen
const sendData = async (data, url) => {
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173'
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
  
  export {sendData};
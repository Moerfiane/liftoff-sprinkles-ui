//TODO: make this work for any path
const sendData = async (path, method, headers, body) => {

    try {
      const response = await fetch(`http://localhost:8080${path}`, {
        method: `${method}`,
        headers: headers,
        body: JSON.stringify(body),
      });
      
      const data = await response.json();

      if (data.success) {
        console.log(data.message);
        console.log(data);
        return data;
      } else {
        console.error('Failed to send data' + data.message);
        return data;
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
    
  };
  
  export {sendData};
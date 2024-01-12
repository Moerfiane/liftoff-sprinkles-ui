const getData = async (path, method, headers) => {
    try {
        const response = await fetch(`http://localhost:8080${path}`, {
            method: method, 
            headers: headers, 
            mode: 'no-cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Assuming response is JSON, adjust accordingly

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to propagate it up the call stack
    }
};

export default getData;
import CourseCard from "./CourseCard";

const getRecipe = async (searchTerm, key) => {
    try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=d1d41094&app_key=${key}
        `, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            }, 
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


  export default function SearchRecipe () {

    return (

    )
  }
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navigation from "./Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { apiCreds } from '../assets/credentials';

// To get the id
const id = apiCreds.getId();

// To get the key
const key = apiCreds.getKey();


const getRecipe = async (searchTerm) => {
    try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${id}&app_key=${key}`, {
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

const apiResponse = await getRecipe('easy breakfast');

  function RecipeList() {
    return (
      <div>
        {apiResponse.hits.map((hit, index) => (
          <RecipeCard key={index} {...hit.recipe} />
        ))}
      </div>
    );
  }
  
  function RecipeCard({ id, label, image, url }) {

    return (
      <Card style={{ width: '18rem' }} key={id} className="mb-3 mt-3">
        <Card.Img variant="top" src={image} alt={`Image for ${label}`} />
    
        <Card.Body>
          <Card.Title>{label}</Card.Title>
          <Card.Text>
          </Card.Text>
          <Link to={url}>
            <Button variant="primary">Recipe details</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

  export default function SearchRecipe () {

    return (
        <>
            <Navigation />
            <Container>
                <h1>Find New Recipes</h1>
                <RecipeList />
            </Container>
            
        </>
        

    );
  }

//   export {getRecipe};


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navigation from "./Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { apiCreds } from '../assets/credentials';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const id = apiCreds.getId();
const key = apiCreds.getKey();

export default function SearchRecipe () {
    const [searchTerm, setSearchTerm] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

    const handleSearch = async () => {
        try {
            const data = await getRecipe(searchTerm);
            console.log('API response:', data);
            setApiResponse(data);
            
          } catch (error) {
            alert("Sorry, an error has occured with your search \n" + error)
          }
    }

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
            
            const data = await response.json();
            console.log('Parsed data:', data); 
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error; 
        }
      };

    return (
        <>
            <Navigation />
            <Container>
                <h1>Find New Recipes</h1>
                <SearchBox 
                    searchTerm={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSubmit={handleSearch}
                />
                {apiResponse && <RecipeList apiResponse={apiResponse} />}
            </Container>
        </>
    );
  }

  function RecipeList({ apiResponse }) {
    if (!apiResponse) {
      return <div>No recipes found.</div>;
    }
  
    const hits = apiResponse.hits;
  
    if (!hits || !Array.isArray(hits) || hits.length === 0) {
      return <div>No recipes found.</div>;
    }
  
    return (
      <div>
        {hits.map((hit, index) => (
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


function SearchBox ({ searchTerm, onChange, onSubmit}) {
    return (
        <>
            <Form.Control size ="lg" type="text" placeholder="Enter a search term" value={searchTerm} onChange={onChange} /> 
            <Button variant="primary" type="button" onClick={onSubmit}>Search</Button>
        </>
    );
}

//   export {getRecipe};


import { useLocation, useMatch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navigation from './Navbar';
import { Container } from 'react-bootstrap';
import ModuleCard from './ModuleCard.jsx'

const getData = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/courses/view/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const CourseDetailsView = ({ id, updateApp }) => {

    
  const [freshData, setFreshData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(id);
        setFreshData(data);
        updateApp();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
        <Navigation />
        <Container>
            <h1>{freshData.name}</h1>
            <h2>Description</h2>
            <p>{freshData.description}</p>
            {console.log(freshData.modules)}
            <ModuleList data={freshData.modules} />
        </Container>
    </>
        
  );
};

const ModuleList = ({ data }) => (
    <>
      {data && data.map((object) => (
        <ModuleCard key={object.id} {...object} />
      ))}
    </>
  );
export default CourseDetailsView;

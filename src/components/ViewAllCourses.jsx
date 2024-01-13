import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './Navbar';
import CourseCard from './CourseCard';
// import getData from '../utilities/getData';

//TODO: Make container flex
//TODO: Import data from backend

const getData = async () => {
  try {
      const response = await fetch(`http://localhost:8080/courses`, {
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

const CourseList = ({ data }) => (
  <Container className="d-flex flex-wrap gap-3">
    {data.map((object) => (
      <CourseCard type="Course" key={object.id} {...object} />
    ))}
  </Container>
);

const ViewCourses = () => {
  const [freshData, setFreshData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setFreshData(data);
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);



  return (
    <>
        <Navigation />
        <Container>
            <h1>View All Courses</h1>
            <CourseList data={freshData} />
        </Container>
    </>
  );
};

export default ViewCourses;

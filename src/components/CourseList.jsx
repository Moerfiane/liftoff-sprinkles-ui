import React from 'react';
import Course from './Course';

function CourseList({ courses, onEnroll }) {
  return (
    <div>
      {courses.map(course => (
        <Course
          key={course.id}
          title={course.title}
          description={course.description}
          onEnroll={() => onEnroll(course.id)}
        />
      ))}
    </div>
  );
}

export default CourseList;
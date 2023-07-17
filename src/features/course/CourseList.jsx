import React from 'react';
import './CourseList.css'; // Import the CSS file for styling
import { useGetCoursesQuery } from './courseApiSlice';
import Course from './Course';
import useAuth from '../../hooks/useAuth';

const CourseList = () => {
  const {status}=useAuth();
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCoursesQuery("courseList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content;

  if (isLoading) {
    content = <p>Loading...</p>
  }
  if (isError) {
    content=<p>{error?.data?.message}</p>
  }

  if (isSuccess && courses?.ids) {
    const { ids } = courses;
    const tableContent = ids?.length && ids?.map(courseId => <Course key={courseId} courseId={courseId} />)

    content = (
      <table className="course-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Instructors</th>
            <th>Students Enrolled</th>
            {
              status==="admin"?<th>Delete</th>:""
            }
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return (
    <div className="course-list-container">
      <h2>Course List</h2>
      {content}
    </div>
  );
};

export default CourseList;
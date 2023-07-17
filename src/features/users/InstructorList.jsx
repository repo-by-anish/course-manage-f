import React from 'react';
import './InstructorList.css'; // Import the CSS file for styling
import { useGetInstructorQuery } from './usersApiSlice';
import Instructor from './Instructor';
import useAuth from '../../hooks/useAuth';

const InstructorList = () => {
  const {status}=useAuth();
  const {
    data: instructor,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetInstructorQuery("instructorList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content;

  if (isLoading) {
    content = <p>Loading...</p>
  }
  if (isError) {
    content = <p>No Instructor Found</p>
  }

  if (isSuccess) {
    const { ids } = instructor;
    const tableContent = ids.length && ids.map(instructorId => <Instructor key={instructorId} instructorId={instructorId} />)
    content = (
      <div className="instructor-list-container">
        <h2>Instructor List</h2>
        <table className="instructor-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Expertise</th>
              <th>Courses Taught</th>
              {
                status==="admin"?<th>Action</th>:""
              }
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </table>
      </div>)
  }

  return (
    content
  );
};

export default InstructorList;
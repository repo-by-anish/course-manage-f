import React from 'react';
import './StudentList.css'; // Import the CSS file for styling
import { useGetStudentsQuery } from './usersApiSlice';
import Student from './Student';
import useAuth from '../../hooks/useAuth';

const StudentList = () => {
  const {status}=useAuth()
  const {
    data: student,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetStudentsQuery("studentList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content;

  if (isLoading) {
    content = <p>Loading...</p>
  }
  if (isError) {
    content = <p>No Students Found</p>
  }

  if (isSuccess&&student?.ids) {
    const { ids } = student;
    const tableContent = ids?.length && ids?.map(studentId => <Student key={studentId} studentId={studentId} />)

    content = (
      <table className="student-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Student ID</th>
            <th>Courses Enrolled</th>
            {
              status==="admin"?(
                <th>Delete</th>
              ):""
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
    <div className="student-list-container">
      <h2>Student List</h2>
      {content}
    </div>
  );
};

export default StudentList;

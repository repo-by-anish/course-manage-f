import React from 'react';
import './AssignmentList.css'; // Import the CSS file for styling
import { useGetAssignmentsQuery } from './assignmentsApiSlice';
import Assignment from './Assignment';
import useAuth from '../../hooks/useAuth';


const AssignmentList = () => {
  const {status}=useAuth()
  const {
    data: assignments,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAssignmentsQuery("assignmentList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })
console.log(assignments);
  let content;

  if (isLoading) {
    content = <p>Loading...</p>
  }
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess && assignments?.ids) {
    const { ids } = assignments;
    const tableContent = ids?.length && ids?.map(assignmentId => <Assignment key={assignmentId} assignmentId={assignmentId} />)

    content = (
      <table className="assignment-list-table">
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Title</th>
            <th>Detail</th>
            <th>Course Name</th>
            <th>Duration</th>
            <th>Semester</th>
            <th>Assignment File</th>
            {
              status==="instructor"?<th>Delete</th>:""
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
    <div className="assignment-list-container">
      <h2>Assignment List</h2>
      {content}
    </div>
  );
};

export default AssignmentList;

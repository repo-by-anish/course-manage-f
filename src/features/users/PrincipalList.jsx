import React from 'react';
import './PrincipalList.css'; // Import the CSS file for styling
import { useGetPrincipalsQuery } from './usersApiSlice';
import Principal from './Principal';
import useAuth from '../../hooks/useAuth';

const PrincipalList = () => {
  const {status}=useAuth();
  const {
    data: principal,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPrincipalsQuery("principalList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>No Principals Found</p>;
  }

  if (isSuccess && principal?.ids) {
    const { ids } = principal;
    const tableContent = ids?.length && ids?.map(principalId => <Principal key={principalId} principalId={principalId} />);
    content=(
      <div className="principal-list-container">
      <h2>Principal List</h2>
      <table className="principal-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            {
              status==="admin"?<th>Action</th>:""
            }

          </tr>
        </thead>
        <tbody>
        {tableContent}
        </tbody>
      </table>
    </div>
    )
  }
  return (
      content
  );
};

export default PrincipalList;

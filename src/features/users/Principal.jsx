import React from 'react'
import { useGetPrincipalsQuery, useDeletePrincipalMutation } from './usersApiSlice';
import useAuth from '../../hooks/useAuth';
const Principal = ({ principalId }) => {
  const { status } = useAuth();
  const { principal } = useGetPrincipalsQuery("principalList", {
    selectFromResult: ({ data }) => ({
      principal: data.entities[principalId]
    })
  });

  const [deletePrincipal, { isSuccess, isError, error }] = useDeletePrincipalMutation();

  const handleDeletePrincipal = async (principalId) => {
    const response = await deletePrincipal({ id: principalId });
    if (response) {
      console.log(response);
    }
  }
  return (
    <tr key={principal._id}>
      <td>{principal._id}</td>
      <td>{principal.firstName} {principal.lastName}</td>
      <td>{principal.email}</td>
      <td>{principal.department}</td>
      {
        status === "admin" ? <td>
          <button
            onClick={() => handleDeletePrincipal(principalId)}
          >
            Delete
          </button>
        </td> : ""
      }
    </tr>
  )
}

export default Principal
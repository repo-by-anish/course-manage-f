import React from 'react';
import { useDeleteAssignmentMutation, useGetAssignmentsQuery } from './assignmentsApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Assignment = ({ assignmentId }) => {
    const { status } = useAuth();
    const { assignment } = useGetAssignmentsQuery("assignmentList", {
        selectFromResult: ({ data }) => ({
            assignment: data.entities[assignmentId]
        })
    });

    const [deleteAssignment, { isSuccess, isError, error }] = useDeleteAssignmentMutation();

    const handleDeleteAssignment = async (assignmentId) => {
        const response = await deleteAssignment({ id: assignmentId });
        if (response) {
            console.log(response);
        }
    };

    const filePath = assignment.assignmentFile
    const startIndex = filePath.indexOf("static");
    const relativePath = filePath.substring(startIndex).replace(/\\/g, "/");


    return (
        <tr>
            <td>{assignment?.assignedBy?.firstName + " " + assignment?.assignedBy?.firstName}</td>
            <td>{assignment.title}</td>
            <td>{assignment.detail}</td>
            <td>{assignment?.courseId?.title}</td>
            <td>{assignment.duration}</td>
            <td>{assignment.semester}</td>
            <td>
                <button onClick={() => { window.open(`http://localhost:3500/${relativePath}`) }}>View</button>
            </td>
            {
                status === "instructor" ? <td>
                    <button onClick={() => { handleDeleteAssignment(assignmentId) }}>Delete</button>
                </td> : ""
            }

        </tr>
    );
};

export default Assignment;

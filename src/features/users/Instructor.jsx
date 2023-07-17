import React from 'react';
import { useDeleteInstructorMutation, useGetInstructorQuery } from './usersApiSlice';
import useAuth from '../../hooks/useAuth';

const Instructor = ({ instructorId }) => {
    const { status } = useAuth()
    const { instructor } = useGetInstructorQuery("instructorList", {
        selectFromResult: ({ data }) => ({
            instructor: data.entities[instructorId]
        })
    });

    const [deleteInst, { isSuccess, isError, error }] = useDeleteInstructorMutation()

    const handleDeleteStudent = (instructorId) => {
        deleteInst({ id: instructorId })
    }
    if (isError) {
        console.log(error);
    }
    return (
        <tr key={instructor._id}>
            <td>{instructor._id}</td>
            <td>{instructor.firstName} {instructor.lastName}</td>
            <td>{instructor.email}</td>
            <td>{instructor.expertise}</td>
            <td>
                {instructor.coursesTaught.map((course, index) => (
                    <p key={index}>{course?.title}</p>
                ))}
            </td>
            {
                status === "admin" ? <td>
                    <button
                        onClick={() => handleDeleteStudent(instructorId)}
                    >
                        Delete
                    </button>
                </td> : ""
            }
        </tr>
    )
}

export default Instructor
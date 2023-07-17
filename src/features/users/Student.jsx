import useAuth from "../../hooks/useAuth"
import { useDeleteStudentMutation, useGetStudentsQuery } from "./usersApiSlice"

const Student = ({ studentId }) => {
    const {status}=useAuth()
    const { student } = useGetStudentsQuery("studentList", {
        selectFromResult: ({ data }) => ({
            student: data.entities[studentId]
        })
    })



    const [deleteStudent, {
        isSuccess,
        isError,
        error
    }
    ] = useDeleteStudentMutation()
    // console.log(student);
    const handleDeleteStudent = async (studentId) => {
        
        const response=await deleteStudent({ id: studentId })
        if(response){
            console.log(response);
        }
    }
    return (
        <tr>
            <td>{studentId}</td>
            <td>{student?.firstName} {student?.lastName}</td>
            <td>{student?.email}</td>
            <td>{student?.studentId}</td>
            <td>
                <ul>
                    {student?.coursesEnrolled.map((course) => (
                        <li key={course._id}>{course.title}</li>
                    ))}
                </ul>
            </td>
           {
            status==="admin"? <td>
                <button onClick={()=>{handleDeleteStudent(studentId)}}>Delete</button>
            </td>:""
           }
        </tr>
    )
}

export default Student
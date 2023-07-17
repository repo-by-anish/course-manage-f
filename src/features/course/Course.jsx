import useAuth from "../../hooks/useAuth"
import { useDeleteCourseMutation, useGetCoursesQuery } from "./courseApiSlice"

const Course = ({ courseId }) => {
    const { status } = useAuth()
    const { course } = useGetCoursesQuery("courseList", {
        selectFromResult: ({ data }) => ({
            course: data.entities[courseId]
        })
    })

    const [deleteCourse, {
        isSuccess,
        isError,
        error
    }] = useDeleteCourseMutation()

    const handleDeleteCourse = async (courseId) => {
        const response = await deleteCourse({ id: courseId })
        if (response) {
            console.log(response);
        }
    }

    return (
        <tr>
            <td>{courseId}</td>
            <td>{course.title}</td>
            <td>{course.description}</td>
            <td> {course?.instructors?.length}</td>
            <td>{course?.studentsEnrolled?.length}</td>
            {
                status === "admin" ? <td>
                    <button onClick={() => { handleDeleteCourse(courseId) }}>Delete</button>
                </td> : ""
            }
        </tr>
    )
}

export default Course
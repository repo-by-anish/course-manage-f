import React, { useState } from 'react';
import './CreateStudentForm.css'; // Import the CSS file for styling
import { useCreateStudentMutation, useGetCourseQuery } from './usersApiSlice';

const CreateStudentForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        studentId: '',
        coursesEnrolled: [],
    });

    const [addStudent, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateStudentMutation()

    const {
        data: courses,
        isSuccess: crsSuccess,
        isLoading: crsLoading,
        isError: crsIsError,
        error: crsError
    } = useGetCourseQuery("courseList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // console.log(courses);


    let content;

    if (crsError) {
        content=<p>{crsError?.data?.message}</p>
    }



    let coursesArray = [];
    let courseOptions;

    // console.log(coursesArray);
    if(isError){
        content=<p>{error?.data?.message}</p>
    }

    const handleChange = (e) => {
        if (e.target.name === 'coursesEnrolled') {
            const selectedCourses = Array.from(e.target.selectedOptions, (option) => option.value);
            setFormData({
                ...formData,
                coursesEnrolled: selectedCourses,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Add your logic to create a new student using the formData
        // console.log('Creating student:', formData);
        await addStudent(formData)
        // Reset the form after submission
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            studentId: '',
            coursesEnrolled: [],
        });
    };

    if (crsSuccess) {
        coursesArray = courses ? Object.values(courses.entities) : [];

        courseOptions = (
            coursesArray.map((course, index) => {
                return (
                    <option key={index} value={course?._id}>{course?.title}</option>
                )
            })
        )
        content=(
            <div className="create-student-form-container">
            <h2>Register Student</h2>
            <form className="create-student-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="studentId">Student ID</label>
                    <input
                        type="text"
                        id="studentId"
                        name="studentId"
                        required
                        value={formData.studentId}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="coursesEnrolled">Courses Enrolled</label>
                    <select
                        multiple
                        id="coursesEnrolled"
                        name="coursesEnrolled"
                        required
                        value={formData.coursesEnrolled}
                        onChange={handleChange}
                    >
                        {courseOptions}
                    </select>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
        )
    }


    return content
};

export default CreateStudentForm;

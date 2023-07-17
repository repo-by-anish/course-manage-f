import React, { useState } from 'react';
import './CreateInstructorForm.css'; // Import the CSS file for styling
import { useCreateInstructorMutation, useGetCourseQuery } from './usersApiSlice';

const CreateInstructorForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        expertise: '',
        coursesTaught: [],
    });

    const [addNewInstructor, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateInstructorMutation()

    const handleChange = (e) => {
        if (e.target.name === 'coursesTaught') {
            const selectedCourses = Array.from(e.target.selectedOptions, (option) => option.value);
            setFormData({
                ...formData,
                coursesTaught: selectedCourses,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };


    if (isError) {
        console.log(error);
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Add your logic to create a new instructor using the formData
        // console.log('Creating instructor:', formData);
        const response=await addNewInstructor(formData)
        if(response){
            console.log(response);
        }
        // Reset the form after submission
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            expertise: '',
            coursesTaught: [],
        });
    };

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

    let coursesArray = [];
    let courseOptions;
    if (crsSuccess) {
        coursesArray = courses ? Object.values(courses.entities) : [];

        courseOptions = (
            coursesArray.map((course, index) => {
                return (
                    <option key={index} value={course?._id}>{course?.title}</option>
                )
            })
        )
    }

    return (
        <div className="create-instructor-form-container">
            <h2>Create Instructor</h2>
            <form className="create-instructor-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expertise">Expertise</label>
                    <input
                        type="text"
                        id="expertise"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="coursesTaught">Courses Taught</label>
                    <select
                        multiple
                        id="coursesTaught"
                        name="coursesTaught"
                        value={formData.coursesTaught.map((course) => course)}
                        onChange={handleChange}
                    >
                        {courseOptions}
                    </select>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateInstructorForm;

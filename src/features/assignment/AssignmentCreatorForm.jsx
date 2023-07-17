import React, { useState } from 'react';

import './AssignmentCreatorForm.css'; // Import the CSS file for styling
import { useGetCourseQuery } from '../users/usersApiSlice';
import { useCreateAssignmentMutation } from './assignmentsApiSlice';
import useAuth from '../../hooks/useAuth';

const AssignmentCreatorForm = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [duration, setDuration] = useState('');
  const [semester, setSemester] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [createAssignment, {
    isLoading,
    isSuccess,
    isError,
    error
  }
  ] = useCreateAssignmentMutation()
  const {foundUser}=useAuth();
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

  const assignedBy = foundUser?._id;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', title);
      formData.append('assignedBy', assignedBy)
      formData.append('detail', detail);
      formData.append('courseId', selectedCourse);
      formData.append('duration', duration);
      formData.append('semester', semester);
      formData.append('file', assignmentFile);
      const res = await createAssignment(formData);
      if (res) {
        alert(res?.data?.message)
      }
      setTitle("")
      setDetail("")
      setSelectedCourse("")
      setDuration("")
      setSemester('')
      setAssignmentFile(null)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="assignment-creator-form-container">
      <form className="assignment-creator-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Create Assignment</h2>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input required type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="detail">Detail:</label>
          <textarea required id="detail" value={detail} onChange={(e) => setDetail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="courseName">Course:</label>
          <select id="courseName" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">Select Course</option>
            {courseOptions}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input required type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <select required id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignmentFile">Assignment File:</label>
          <input required type="file" id="assignmentFile" onChange={(e) => setAssignmentFile(e.target.files[0])} />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AssignmentCreatorForm;

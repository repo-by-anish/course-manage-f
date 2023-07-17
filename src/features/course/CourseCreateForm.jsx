import React, { useState } from 'react';
import './CourseCreateForm.css'; // Import the CSS file for styling
import { useCreateCourseMutation } from './courseApiSlice';
import FormData from "form-data"  

const CourseCreateForm = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [syllabusFile, setSyllabusFile] = useState(null);
  const bachelorCourses = [
    'Bachelor of Technology (B.Tech)',
    'Bachelor of Engineering (B.E.)',
    'Bachelor of Science (B.Sc)',
    'Bachelor of Commerce (B.Com)',
    'Bachelor of Arts (B.A.)',
    'Bachelor of Business Administration (BBA)',
    'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    'Bachelor of Dental Surgery (BDS)',
    'Bachelor of Pharmacy (B.Pharm)',
    'Bachelor of Architecture (B.Arch)',
    'Bachelor of Fine Arts (BFA)',
    'Bachelor of Design (B.Des)',
    'Bachelor of Hotel Management (BHM)',
    'Bachelor of Law (LLB)',
    'Bachelor of Journalism and Mass Communication (BJMC)',
    'Bachelor of Computer Applications (BCA)',
    'Bachelor of Animation and Multimedia',
    'Bachelor of Fashion Design',
    'Bachelor of Interior Design',
    'Bachelor of Event Management',
    'Bachelor of Social Work (BSW)',
    'Bachelor of Physiotherapy (BPT)',
    'Bachelor of Occupational Therapy (BOT)',
    'Bachelor of Education (B.Ed)',
    'Bachelor of Nursing (B.Sc Nursing)',
    'Bachelor of Veterinary Science (B.V.Sc)',
    'Bachelor of Ayurvedic Medicine and Surgery (BAMS)',
    'Bachelor of Homeopathic Medicine and Surgery (BHMS)',
    'Bachelor of Naturopathy and Yogic Sciences (BNYS)',
    'Bachelor of Optometry (B.Optom)',
    'Bachelor of Audiology and Speech-Language Pathology (BASLP)',
  ];

  const courseTitelOptions = bachelorCourses.map((course, index) => (
    <option key={index} value={course}>
      {course}
    </option>
  ))


  const [createCourse, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateCourseMutation()



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', syllabusFile);
    setTitle("")
    setDescription("")
    await createCourse(formData).unwrap().then((response) => {
      // Handle successful upload response
      console.log(response);
    })
    .catch((error) => {
      // Handle upload error
      console.error(error);
    })
    // Reset the form after submission
  };

  if (isError) {
    console.log(error);
  }

  return (
    <div className="create-course-form-container">
      <form className="create-course-form" onSubmit={handleSubmit}>
        <h2>Create Course</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select
            id="title"
            name="title"
            value={title}
            onChange={e => { setTitle(e.target.value) }}
          >
            <option value="">Select Title</option>
            {courseTitelOptions}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="syllabus">Syllabus</label>
          <input required type="file" id="syllabus" onChange={(e) => setSyllabusFile(e.target.files[0])} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CourseCreateForm;
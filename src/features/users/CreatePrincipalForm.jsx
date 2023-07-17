import React, { useState } from 'react';
import './CreatePrincipalForm.css'; // Import the CSS file for styling
import { useCreatePrincipalMutation } from './usersApiSlice';

const CreatePrincipalForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    department: '',
  });
  const [addPrincipal, { isLoading, 
      isSuccess, 
      isError, 
      error 
    }] = useCreatePrincipalMutation();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Add your logic to create a new principal using the formData
    // console.log('Creating principal:', formData);
    try {
      const response = await addPrincipal(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // Reset the form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      department: '',
    });
  };

  return (
    <div className="create-principal-form-container">
      <h2>Create Principal</h2>
      <form className="create-principal-form" onSubmit={handleSubmit}>
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
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePrincipalForm;

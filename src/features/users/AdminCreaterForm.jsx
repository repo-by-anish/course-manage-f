import React, { useState } from 'react';
import './CreateAdminForm.css'; // Import the CSS file for styling
import { useCreateAdmin, useCreateAdminMutation } from './usersApiSlice';

const AdminCreaterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [addAdmin, { isLoading, 
      isSuccess, 
      isError, 
      error 
    }] = useCreateAdminMutation();
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
      const response = await addAdmin(formData);
      alert(response?.data?.message)
    } catch (error) {
      console.log(error);
    }
    // Reset the form after submission
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className="create-principal-form-container">
      <h2>Create Admin</h2>
      <form className="create-principal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AdminCreaterForm;

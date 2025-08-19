import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../utils/config';
import { toast } from 'react-toastify';


const Profile = () => {






  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

  };
   

  useEffect(() => {
    // Fetch user data and populate form
    const fetchUserData = async () => {
      const userData = await axiosInstance.get(`${apiUrl}/auth/profile`); // Replace with your data fetching logic
     console.log(userData);

      setFormData(
        {
          name: userData.data.data.user.name,
          email: userData.data.data.user.email,
          // address: userData.data.data.user.address,
          phone: userData.data.data.user.phone,
          currentPassword: '' ,
          newPassword: '',
          confirmPassword: ''
        }
      );
    };
    fetchUserData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    // Handle update logic
    
     const payload = {
       phone: formData.phone,
       name: formData.name,
     }

     try{
       const response = await axiosInstance.put(`${apiUrl}/auth/profile`, payload);
       if (response.data.success) {
      toast.success(response.data.message || "Profile updated successfully!");
       
        console.log(response);
       }

     } catch (error) {
       console.error('Error updating profile:', error);
        toast.error(error.response?.data?.message || "Failed to update profile.");
     }
  };

  const handlePasswordUpdate = async (e) => {
  e.preventDefault();

  if (formData.newPassword !== formData.confirmPassword) {
    alert("New passwords do not match!");
    return;
  }

  const payload = {
    currentPassword: formData.currentPassword,
    newPassword: formData.newPassword,
  };

  try {
    const response = await axiosInstance.put(`${apiUrl}/auth/change-password`, payload);

    if (response.data.success) {
      toast.success(response.data.message || "Password updated successfully!");
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      toast.error(response.data.message || "Failed to update password.");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    toast.error(error.response?.data?.message || "Failed to update password.");
  }
};


  return (
    <div className="p-4">
      <h2 className="mb-4">User Profile</h2>

      {/* Profile Info */}
      <form onSubmit={handleProfileUpdate} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            readOnly
          />
        </div>

            <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
                  type="number"
                  className="form-control "
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows={3}
            required
          />
        </div> */}
        <button type="submit" className="btn btn-warning text-white">Update Profile</button>
      </form>

      {/* Password Update */}
      <h4 className="mb-3">Change Password</h4>
      <form onSubmit={handlePasswordUpdate}>
        <div className="mb-3">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Update Password</button>
      </form>
    </div>
  );
};

export default Profile;
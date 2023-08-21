import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DoctorForm from '../../components/DoctorForm';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Layout from '../../components/Layout';

// Allows doctor user to update profile using DoctorForm component
function Profile() {
  // Retrieve the user data from the Redux store
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle the form submission and update doctor profile
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // Send a PUT request to update doctor profile
      const response = await fetch(
        '/api/doctor/update-doctor-profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values, userId: user._id }),
        },
      );
      const data = await response.json();
      dispatch(hideLoading());
      if (data.success) {
        // Show success toast and navigate to home page if successful
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default Profile;

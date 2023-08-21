import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import Layout from '../components/Layout';
import DoctorForm from '../components/DoctorForm';

// This component allows a user to apply for the doctor role using DoctorForm component
function ApplyDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Retrieve the user data from the Redux store
  const { user } = useSelector((state) => state.user);

  // Function to handle the form submission and register as a doctor
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // Send a POST request to register as a doctor
      const response = await fetch('/api/users/register-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, userId: user._id }),
      });
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
      <h1 className='page-title'>Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;

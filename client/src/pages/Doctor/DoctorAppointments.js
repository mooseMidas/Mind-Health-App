import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Table } from 'antd';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Layout from '../../components/Layout';

// This component displays appointments for a doctor and allows them to change appointment status
function DoctorAppointments() {
  // Retrieve the user data from the Redux store
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  // Function to fetch appointments data from the server
  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      // Fetch appointment data for the current doctor from the server
      const response = await fetch(
        '/api/doctor/get-appointments-by-doctorId',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user._id }),
        },
      );
      const data = await response.json();
      dispatch(hideLoading());
      if (data.success) {
        // Update state with fetched data if successful
        setAppointments(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error('Failed to fetch data');
    }
  };

  // Fetch appointments list when component is mounted
  useEffect(() => {
    getAppointments();
  }, []);

  // Function to change the appointment's status
  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      // Send a POST request to update appointment status
      const response = await fetch(
        '/api/doctor/change-appointment-status',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ appointmentId: record._id, status }),
        },
      );
      const data = await response.json();
      dispatch(hideLoading());
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      }
    } catch (error) {
      toast.error('Error updating status');
      dispatch(hideLoading());
    }
  };

  // Define columns for the Ant Design Table component
  const columns = [
    {
      title: 'Client',
      render: (text, record) => (
        <span>
          {record.userInfo.name}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) => (
        <span>
          {record.userInfo.email}
        </span>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      render: (text, record) => (
        <span>
          {(record.date)}
          {' '}
          {(record.time)}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' && (
          <div className="d-flex">
            <h1
              className="anchor px-2"
              onClick={() => changeAppointmentStatus(record, 'approved')}
            >
              Approve
            </h1>
            <h1
              className="anchor"
              onClick={() => changeAppointmentStatus(record, 'rejected')}
            >
              Reject
            </h1>
          </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-title">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default DoctorAppointments;

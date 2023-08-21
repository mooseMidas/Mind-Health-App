import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Table } from 'antd';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import Layout from '../components/Layout';

// This component displays the user's appointment requests and their status
function Appointments() {
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  // Function to fetch user's appointments
  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await fetch(
        '/api/users/get-appointments-by-userId',
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
        setAppointments(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: 'Doctor',
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName}
          {' '}
          {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      render: (text, record) => (
        <span>
          {record.doctorInfo.phoneNumber}
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
  ];

  return (
    <Layout>
      <h1 className="page-title">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default Appointments;

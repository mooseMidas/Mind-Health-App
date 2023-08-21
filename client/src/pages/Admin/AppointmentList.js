// Disable noninteractive element warnings for this component
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Table } from 'antd';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Layout from '../../components/Layout';

// This component allows an Admin user to view all appointments made
function AppointmentList() {
  // State to store the list of appointments
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  // Function to fetch appointment data from the server
  const getAppointmentData = async () => {
    try {
      // Show loading state while fetching data
      dispatch(showLoading());
      const response = await fetch('/api/admin/get-all-appointments');
      const data = await response.json();
      // Hide loading state
      dispatch(hideLoading());
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Failed to fetch data');
    }
  };

  // Fetch appointment list when component is mounted
  useEffect(() => {
    getAppointmentData();
  }, []);

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
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (createdAt) => (createdAt).slice(0, 10),
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Booked With',
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName}
          {' '}
          {record.doctorInfo.lastName}
        </span>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-title">Doctors List</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default AppointmentList;

// Table, Ant Design Retrieved on 16 August 2023 from https://ant.design/components/table

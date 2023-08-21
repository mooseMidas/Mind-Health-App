import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Table } from 'antd';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Layout from '../../components/Layout';

// This component allows an Admin user to view all doctor requests
// and allows Admin to update isDoctor status
function DoctorsList() {
  // State to store the list of doctors
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  // First need to fetch doctor data from the server
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await fetch('/api/admin/get-all-doctors');
      const data = await response.json();
      dispatch(hideLoading());
      if (data.success) {
        // Update state with fetched data if successful
        setDoctors(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Failed to fetch data');
    }
  };

  // Fetch Doctor list when component is mounted
  useEffect(() => {
    getDoctorsData();
  }, []);

  // Function to change the doctor's status
  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      // Send a POST request to update doctor status.
      const response = await fetch('/api/admin/update-doctor-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // data required by API to find user in DB and update status
        body: JSON.stringify({ doctorId: record._id, userId: record.userId, status }),
      });
      const data = await response.json();
      dispatch(hideLoading());
      if (data.success) {
        toast.success(data.message);
        // Update doctor list every time a status is updated successfully
        getDoctorsData();
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Error updating account status');
    }
  };

  // Define columns for the Ant Design Table component
  const columns = [
    {
      title: 'Name',
      render: (record) => (
        <span>
          {record.firstName}
          {' '}
          {record.lastName}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
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
      title: 'Actions',
      render: (record) => (
        <div className="d-flex">
          {record.status === 'pending' && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, 'approved')}
            >
              Approve
            </h1>
          )}
          {record.status === 'approved' && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, 'blocked')}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-title">Doctors List</h1>
      <hr />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default DoctorsList;

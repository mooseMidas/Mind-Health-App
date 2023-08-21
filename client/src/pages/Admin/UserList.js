import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Table } from 'antd';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Layout from '../../components/Layout';

// This component allows an Admin user to view all users
function UserList() {
  // State to store the users of appointments
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  // Function to fetch users data from the server
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await fetch('/api/admin/get-all-users');
      const data = await response.json();
      dispatch(hideLoading());
      if (data.success) {
        toast.success(data.message);
        setUsers(data.data);
        console.log(users);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Error from server');
    }
  };

  // Fetch users list when component is mounted
  useEffect(() => {
    getUserData();
  }, []);

  // Define columns for the Ant Design Table component
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (createdAt) => (createdAt).slice(0, 10),
    },
  ];

  return (
    <Layout>
      <h1 className='page-title'>User List</h1>
      <h2 className='normal-text'>
        No. of users:
        {' '}
        {users.length}
      </h2>
      <hr />
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}

export default UserList;

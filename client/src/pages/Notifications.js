import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { setUser } from '../redux/userSlice';

// Notifications component displays user notifications and allows interactions
function Notifications() {
  // Get user information from Redux store
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Function to mark all notifications as seen based on user Id
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await fetch('/api/users/mark-all-as-seen', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await response.json();
      dispatch(hideLoading());
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.data));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Function to delete all notifications based on user Id
  const deleteAllNotifications = async () => {
    try {
      dispatch(showLoading());
      const response = await fetch('/api/users/delete-all-notifications', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await response.json();
      // if user found, return user details
      dispatch(hideLoading());
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.data));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Layout>
      <h1 className='page-title'>Notifications</h1>
      <hr />
      <Tabs
        defaultActiveKey="unseen"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="unseen" title="Unseen">
          <div className='d-flex justify-content-end'>
            <h2 className='anchor' onClick={() => markAllAsSeen()}>Mark all as seen</h2>
          </div>

          {user?.unseenNotifications.map((notify) => (
            <div className='card p-3 mt-2'>
              <div>{notify.message}</div>
            </div>
          ))}
        </Tab>
        <Tab eventKey="seen" title="Seen">
          <div className='d-flex justify-content-end'>
            <h2 className='anchor' onClick={() => deleteAllNotifications()}>Delete All</h2>
          </div>
          {user?.seenNotifications.map((notify) => (
            <div className='card p-3 mt-2'>
              <div>{notify.message}</div>
            </div>
          ))}
        </Tab>
      </Tabs>
    </Layout>

  );
}

export default Notifications;

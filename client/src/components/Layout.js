import React, { useState, useEffect } from 'react';
import './Layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Badge } from 'antd';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { setUser } from '../redux/userSlice';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Will manage state of side bar. User is able to collapse sidebar menu
  const [collapsed, setCollapsed] = useState(false);
  // location pathname will confirm active menu path. Assists in styling
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  // Function to fetch user data
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await fetch('/api/users/get-user');
      // if user found, save user details and stop reload request
      dispatch(hideLoading());
      if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
      } else {
        // user not found
        console.log('Error getting user:', response.status);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Data is fetched on initial render
  useEffect(() => {
    if (!user) { getUser(); }
  }, [user]);

  // Allows user to logout
  // User token is cleared in backend
  const handleLogout = async () => {
    try {
      dispatch(showLoading());
      const response = await fetch('/api/auth/logout');
      dispatch(hideLoading());
      if (response.ok) {
        // User details cleared if user clicks logout
        setUser(null);
        toast.success('Logged out successfully');
        // User is then navigated to Login/Register page
        navigate('/login');
      } else {
        dispatch(hideLoading());
        console.log('Error logging out:', response.status);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.error('Error:', err);
    }
  };
  // Sidebar menu will be rendered based on user role
  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-2-fill',
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-file-list-3-fill',
    },
    {
      name: 'Apply Doctor',
      path: '/apply-doctor',
      icon: 'ri-hospital-fill',
    },
  ];

  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Appointments',
      path: '/doctor/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'ri-user-line',
    },
  ];

  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-2-fill',
    },
    {
      name: 'Users',
      path: '/admin/userlist',
      icon: 'ri-user-line',
    },
    {
      name: 'Doctors',
      path: '/admin/doctorlist',
      icon: 'ri-hospital-fill',
    },
    {
      name: 'Appointments',
      path: '/admin/appointments',
      icon: 'ri-file-list-line',
    },
  ];
  // Confirming user role before rendering menu
  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? 'Admin' : user?.isDoctor ? 'Doctor' : 'User';

  return (
    <div className='main'>
      <div className='d-flex layout'>
        <div className='sidebar'>
          <div className='sidebar-header'>
            <h1 className='logo'>MH</h1>
            <h2 className="role mt-2">{role}</h2>
          </div>
          <div className='menu'>
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={menu.path} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                  <i className={menu.icon} />
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div className="d-flex menu-item" onClick={() => handleLogout()}>
              <i className='ri-logout-box-fill' />
              {!collapsed && <Link to='/login'>Log out</Link>}
            </div>
          </div>
        </div>
        <div className='content'>
          {/* Allows user to collapse sidebar menu */}
          <div className='header'>
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              />

            ) : (
              <i
                className="ri-close-circle-line header-action-icon"
                onClick={() => setCollapsed(true)}
              />
            )}

            <div className='d-flex align-items-center px-4'>
              {/* Badge navigates user to notifications */}
              <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                <i className="ri-notification-3-line header-action-icon px-3" />
              </Badge>
              <span className='mx-3'>
                Welcome
                {' '}
                {user?.name}
              </span>
            </div>
          </div>
          <div className='body'>{children}</div>
        </div>
      </div>
    </div>
  );
}

// useLocation v6.15.0, v6.15.0 | React Router Retrieved on 13 August 2023 from https://reactrouter.com/en/6.15.0/hooks/use-location
// Conditional Rendering, React Retrieved on 16 August 2023 from https://legacy.reactjs.org/docs/conditional-rendering.html
// Six methods to achieve conditional rendering in React, Flexiple, Retrieved on 16 August 2023 from https://flexiple.com/react/conditional-rendering-in-react/

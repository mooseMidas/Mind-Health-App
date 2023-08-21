import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './hooks/useAuth';

// Component handles private routing by using custom hook
// useAuth validates token
function PrivateRoutes() {
  const { auth } = useAuth();
  console.log({ auth });
  // If the authentication status is still being determined, show a loading message
  if (auth === undefined) return 'loading...';
  // If the user is authenticated render the child routes using Outlet,
  // if not, user is navigated to Login page
  return (
    auth === true ? <Outlet /> : <Navigate to="/login" />
  );
}

export default PrivateRoutes;

// Outlet v6.14.2, Outlet v6.14.2 | React Router, Retrieved on 05/08/2023 from https://reactrouter.com/en/main/components/outlet

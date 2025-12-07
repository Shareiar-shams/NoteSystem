import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

const AuthRoute = ({ children }) => {
  const token = getAuthToken();

  if (token) {
    return <Navigate to="/private" replace />;
  }

  return children;
};

export default AuthRoute;
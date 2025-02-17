import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const NotProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  console.log(token);
  if(token == undefined) {
   return children
  }
  else{
    return !token ? children : <Navigate to="/" />;
    
  }
  
};

export default NotProtectedRoute;
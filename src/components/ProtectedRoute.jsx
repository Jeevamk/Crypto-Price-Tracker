import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
 console.log(token);
  if(token==undefined) {
   return <Navigate to='/login' />
  }else{
    return token ? children : <Navigate to="/login" />;
  }
 
 
};



export default ProtectedRoute;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../features/auth/api';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await API.get(`/api/user/verify/${token}`);
        console.log(response);
        setMessage('Email verified successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful verification
        }, 2000);
      } catch (error) {
        setMessage('Verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">{message}</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;

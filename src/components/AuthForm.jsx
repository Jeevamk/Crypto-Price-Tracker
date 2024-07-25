import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, login } from '../features/auth/authSlice';
import API from '../features/auth/api';




const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const signupValidationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };



  const handleSubmit = (values) => {
    const action = isLogin ? login(values) : signup(values);
    dispatch(action).then((result) => {
      if (result.type === `auth/${isLogin ? 'login' : 'signup'}/fulfilled`) {
       
        localStorage.setItem('token', result.payload.token);
        API.defaults.headers.common['Authorization'] = `Bearer ${result.payload.token}`;
        navigate('/');
      } else {
        console.error('Error:', result.payload);
      }
    }).catch((error) => {
      console.error('Dispatch error:', error);
    });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={isLogin ? loginValidationSchema : signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Username"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
              {status === 'loading' && <div className="text-white text-center mt-4">Loading...</div>}
              {error && (
                <div className="text-red-500 text-center mt-4">
                  {typeof error === 'string' ? error : error?.message || 'An error occurred'}
                </div>
              )}
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;



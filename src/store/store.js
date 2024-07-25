// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import API from '../features/auth/api';

// Load user and token from localStorage if available
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const preloadedState = {
  auth: {
    user: user || null,
    token: token || null,
    status: 'idle',
    error: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState, 
});

export default store;
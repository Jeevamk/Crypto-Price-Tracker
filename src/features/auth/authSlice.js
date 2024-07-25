import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from './api'; 

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, //user
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};


export const signup = createAsyncThunk(
  'auth/signup',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/api/user/register', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/api/user/login', formData); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      delete API.defaults.headers.common['Authorization'];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.result;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        
        API.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token};`
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = typeof action.payload === 'string' ? action.payload : action.payload?.message || 'Signup failed';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.result;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        
        API.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = typeof action.payload === 'string' ? action.payload : action.payload?.message || 'Login failed';
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
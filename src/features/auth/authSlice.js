import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


//signup
export const signup = createAsyncThunk('auth/signup', async (userDetails, rejectWithValue) => {
    try {
        const reponse = await axios.post('http://localhost:5001/api/user/register', userDetails)
        return reponse.data;
        

    } catch (error) {
        if (error.reponse && error.reponse.data) {
            console.log(error.reponse.data)
            return rejectWithValue(error.reponse.data.message)
        }
        console.log(error);
        return rejectWithValue(error.message)
    }
})

//login

export const login = createAsyncThunk('auth/login', async (userDetails, rejectWithValue) => {
    try {
        const reponse = await axios.post('/api/signup', userDetails)
        return reponse.data;

    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.msg);
        }
        return rejectWithValue(error.message)
    }
})


//slice
const authSlice = createSlice({
    name :'auth',
    initialState :{
        user : null,
        token:null,
        status: 'idle',
        error:null
    
    },
    reducers: {
        logout : (state) => {
            state.user = null;
            state.token=null;
            state.status = null;
            state.error=null;
        }
    },

    extraReducers: (builder) => {
        builder
          .addCase(signup.pending, (state) => {
            state.status = 'loading'; 
          })
          .addCase(signup.fulfilled, (state, action) => {
            state.status = 'succeeded'; 
            state.user = action.payload; 
          })
          .addCase(signup.rejected, (state, action) => {
            state.status = 'failed'; 
            state.error = action.payload; 
          })
          .addCase(login.pending, (state) => {
            state.status = 'loading'; 
          })
          .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded'; 
            state.user = action.payload; 
          })
          .addCase(login.rejected, (state, action) => {
            state.status = 'failed'; 
            state.error = action.payload; 
          });
      },
})


export const { logout } = authSlice.actions;

export default authSlice.reducer;
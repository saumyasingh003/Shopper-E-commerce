import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import hostName from '../config';

export const loginUser = createAsyncThunk(
  'admin/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${hostName}/login`, userCredentials);
      const data = await response.data;
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = '/home';
      return data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Access denied! Invalid Credentials');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;

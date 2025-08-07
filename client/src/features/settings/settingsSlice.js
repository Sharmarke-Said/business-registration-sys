import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
};

const axiosInstance = axios.create({
  withCredentials: true,
});

export const updateCurrentUser = createAsyncThunk(
  "settings/updateCurrentUser",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/api/v1/users/updateMe",
        formData
      );
      dispatch(authSlice.actions.updateUser(response.data.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "settings/updateUserPassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/api/v1/users/updateMyPassword",
        passwordData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCurrentUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { reducer } = settingsSlice;
export default settingsSlice.reducer;

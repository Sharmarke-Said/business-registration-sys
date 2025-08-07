import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create a custom axios instance with a base URL and credentials
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Adjust the URL if your API is different
  withCredentials: true,
});

// Get a user's dashboard stats
export const fetchUserDashboardStats = createAsyncThunk(
  "user/fetchUserDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      // Use the custom 'api' instance
      const response = await api.get("/dashboard/user-stats");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetch all businesses for the current user
export const fetchMyBusinesses = createAsyncThunk(
  "user/fetchMyBusinesses",
  async (_, { rejectWithValue }) => {
    try {
      // Use the custom 'api' instance
      const response = await api.get("/businesses/me/my-business");
      return response.data.data.businesses;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Register a new business
export const registerBusiness = createAsyncThunk(
  "user/registerBusiness",
  async (businessData, { rejectWithValue }) => {
    try {
      // Use the custom 'api' instance
      const response = await api.post("/businesses", businessData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data.business;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete a business
export const deleteBusiness = createAsyncThunk(
  "user/deleteBusiness",
  async (businessId, { rejectWithValue }) => {
    try {
      // Use the custom 'api' instance
      await api.delete(
        `/businesses/me/delete-my-business/${businessId}`
      );
      return businessId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    stats: null,
    businesses: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User Dashboard Stats
      .addCase(fetchUserDashboardStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDashboardStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Safely access the totals property to prevent errors if the payload is malformed
        if (action.payload && action.payload.totals) {
          state.stats = action.payload.totals;
        } else {
          state.stats = null;
        }
      })
      .addCase(fetchUserDashboardStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch My Businesses
      .addCase(fetchMyBusinesses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyBusinesses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.businesses = action.payload;
      })
      .addCase(fetchMyBusinesses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Register Business
      .addCase(registerBusiness.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.businesses.push(action.payload);
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Business
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.businesses = state.businesses.filter(
          (business) => business._id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;

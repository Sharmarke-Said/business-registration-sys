import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/businesses",
  withCredentials: true,
});

const initialState = {
  businesses: [],
  status: "idle",
  error: null,
};

// Async thunks for business management
export const fetchAllBusinesses = createAsyncThunk(
  "businesses/fetchAllBusinesses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/");
      return response.data.data.businesses;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveOrRejectBusiness = createAsyncThunk(
  "businesses/approveOrRejectBusiness",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/${id}/approval`, { status });
      return response.data.data.business;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBusiness = createAsyncThunk(
  "businesses/deleteBusiness",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const businessSlice = createSlice({
  name: "businesses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBusinesses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBusinesses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.businesses = action.payload;
        state.error = null;
      })
      .addCase(fetchAllBusinesses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.businesses = [];
      })
      .addCase(approveOrRejectBusiness.fulfilled, (state, action) => {
        const updatedBusiness = action.payload;
        const index = state.businesses.findIndex(
          (b) => b._id === updatedBusiness._id
        );
        if (index !== -1) {
          state.businesses[index] = updatedBusiness;
        }
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.businesses = state.businesses.filter(
          (b) => b._id !== action.payload
        );
      });
  },
});

export default businessSlice.reducer;

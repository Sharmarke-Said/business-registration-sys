import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an Axios instance with credentials
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/business-types",
  withCredentials: true,
});

const initialState = {
  businessTypes: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunks for CRUD operations
export const fetchBusinessTypes = createAsyncThunk(
  "businessTypes/fetchBusinessTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBusinessType = createAsyncThunk(
  "businessTypes/createBusinessType",
  async (businessTypeData, { rejectWithValue }) => {
    try {
      const response = await api.post("/", businessTypeData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBusinessType = createAsyncThunk(
  "businessTypes/updateBusinessType",
  async ({ id, businessTypeData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/${id}`, businessTypeData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBusinessType = createAsyncThunk(
  "businessTypes/deleteBusinessType",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const businessTypeSlice = createSlice({
  name: "businessTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBusinessTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.businessTypes = action.payload;
        state.error = null;
      })
      .addCase(fetchBusinessTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.businessTypes = []; // Ensure state is cleared on failure
      })
      .addCase(createBusinessType.fulfilled, (state, action) => {
        state.businessTypes.push(action.payload);
      })
      .addCase(updateBusinessType.fulfilled, (state, action) => {
        const index = state.businessTypes.findIndex(
          (bt) => bt._id === action.payload._id
        );
        if (index !== -1) {
          state.businessTypes[index] = action.payload;
        }
      })
      .addCase(deleteBusinessType.fulfilled, (state, action) => {
        state.businessTypes = state.businessTypes.filter(
          (bt) => bt._id !== action.payload
        );
      });
  },
});

export default businessTypeSlice.reducer;

// // src/features/auth/authSlice.js
// /* eslint-disable no-unused-vars */
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true,
// });

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// // Async thunk to check for an active user session
// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get("/users/me");
//       return response.data.data.user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Login to proceed..");
//     }
//   }
// );

// // Async thunk for user login using axios
// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const response = await api.post("/users/login", {
//         email,
//         password,
//       });

//       const data = response.data;
//       if (data.status !== "success") {
//         return thunkAPI.rejectWithValue(
//           data.message || "Login failed"
//         );
//       }
//       return data.data.user;
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "An error occurred during login.";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Async thunk for user signup using axios
// export const signup = createAsyncThunk(
//   "auth/signup",
//   async ({ name, email, password, passwordConfirm }, thunkAPI) => {
//     try {
//       const response = await api.post("/users/signup", {
//         name,
//         email,
//         password,
//         passwordConfirm,
//       });

//       const data = response.data;
//       if (data.status !== "success") {
//         return thunkAPI.rejectWithValue(
//           data.message || "Signup failed"
//         );
//       }
//       return data.data.user;
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "An error occurred during signup.";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Async thunk for user logout
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, thunkAPI) => {
//     try {
//       await api.post("/users/logout");
//       return null;
//     } catch (error) {
//       // Even if the API call fails, we should still clear the state on the client side
//       return thunkAPI.rejectWithValue(null);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.status = "idle";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Cases for fetchCurrentUser
//       .addCase(fetchCurrentUser.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchCurrentUser.rejected, (state, action) => {
//         state.status = "failed";
//         state.isAuthenticated = false;
//         state.user = null;
//         state.error = action.payload;
//       })
//       // Cases for login
//       .addCase(login.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = "failed";
//         state.isAuthenticated = false;
//         state.user = null;
//         state.error = action.payload;
//       })
//       // Cases for signup
//       .addCase(signup.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.status = "failed";
//         state.isAuthenticated = false;
//         state.user = null;
//         state.error = action.payload;
//       })
//       // Cases for logoutUser
//       .addCase(logoutUser.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.status = "idle";
//         state.isAuthenticated = false;
//         state.user = null;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state) => {
//         state.status = "idle";
//         state.isAuthenticated = false;
//         state.user = null;
//         state.error = null;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isLoading: false,
  isUpdating: false,
};

// Async thunk to check for an active user session
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/me");
      return response.data.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue("Login to proceed..");
    }
  }
);

// Async thunk for user login using axios
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      const data = response.data;
      if (data.status !== "success") {
        return thunkAPI.rejectWithValue(
          data.message || "Login failed"
        );
      }
      return data.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred during login.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for user signup using axios
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password, passwordConfirm }, thunkAPI) => {
    try {
      const response = await api.post("/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      const data = response.data;
      if (data.status !== "success") {
        return thunkAPI.rejectWithValue(
          data.message || "Signup failed"
        );
      }
      return data.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred during signup.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await api.post("/users/logout");
      return null;
    } catch (error) {
      // Even if the API call fails, we should still clear the state on the client side
      return thunkAPI.rejectWithValue(null);
    }
  }
);

// NEW: Async thunk to update user's name and email
export const updateMe = createAsyncThunk(
  "auth/updateMe",
  async (userData, thunkAPI) => {
    try {
      const response = await api.patch("/users/updateMe", userData);
      return response.data.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  }
);

// NEW: Async thunk to update user's password
export const updateMyPassword = createAsyncThunk(
  "auth/updateMyPassword",
  async (passwordData, thunkAPI) => {
    try {
      const response = await api.patch(
        "/users/updateMyPassword",
        passwordData
      );
      return response.data.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update password."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Cases for fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      // Cases for login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      // Cases for signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      // Cases for logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      // Cases for updateMe
      .addCase(updateMe.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      // Cases for updateMyPassword
      .addCase(updateMyPassword.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateMyPassword.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload; // Backend returns the new user data
        state.error = null;
      })
      .addCase(updateMyPassword.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

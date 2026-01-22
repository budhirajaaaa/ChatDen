import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";

// THUNKS
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/check");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Auth check failed");
  }
});

export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    // toast.success("Account created successfully!");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    // toast.error(message);
    return rejectWithValue(message);
  }
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/login", data); // Fixed path from /logout to /login
    // toast.success("Welcome back!");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    // toast.error(message);
    return rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    // toast.success("Logged out");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Logout failed";
    return rejectWithValue(message);
  }
});

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => { state.isCheckingAuth = true; })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.authUser = null;
        state.isCheckingAuth = false;
        console.log("CheckAuth Error:", action.payload); // Logged here
      })

      // Signup
      .addCase(signup.pending, (state) => { state.isSigningUp = true; })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSigningUp = false;
        console.log("Signup Error:", action.payload); // Logged here
      })

      // Login
      .addCase(login.pending, (state) => { state.isLoggingIn = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        console.log("Login Error:", action.payload); // Logged here
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log("Logout Error:", action.payload); // Logged here
      });
  },
});

export default authSlice.reducer;

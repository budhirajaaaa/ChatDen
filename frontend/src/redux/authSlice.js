import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";

// Async thunk for checking auth
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/check");
    return res.data;
  } catch (error) {
    console.log("Error in authCheck:", error);
    return thunkAPI.rejectWithValue(null);
  }
});
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      // toast.success("Account created successfully!");
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      // toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isLoggedIn: false,
    isLoading: false,
    isCheckingAuth: true,
    isSigningUp: false,
  },
  reducers: {
    // Synchronous login action
    login: (state) => {
      console.log("We just logged in");
      state.isLoggedIn = true;
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      });
  },
  extraReducers: (builder) => {
    builder
      // Signup Cases
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

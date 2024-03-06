import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosApi } from "../../config/axiosApi";
import { errorMessages } from "../../misc/errorMessages";
import { User, UserState } from "../../misc/types";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isAvailableEmail: false,
};

export type LoginInfo = {
  email: string;
  password: string;
};

export const fetchLogin = createAsyncThunk<User, LoginInfo>(
  "user/fetchLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const tokenData = await axiosApi.post("auth/login", { email, password });
      const userData = await axiosApi.get("auth/profile", {
        headers: { Authorization: `Bearer ${tokenData.data.access_token}` },
      });
      // console.log(userData.data);
      return userData.data;
    } catch (error: any) {
      return rejectWithValue(errorMessages[error.response.status]);
    }
  }
);

export const checkAvailableEmail = createAsyncThunk<boolean, string>(
  "user/checkAvailableEmail",
  async (email, { rejectWithValue }) => {
    try {
      const emailCheckingRes = await axiosApi.post("users/is-available", {
        email,
      });
      return emailCheckingRes.data.isAvailable;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAvailableEmail.fulfilled, (state, action) => {
      state.isAvailableEmail = action.payload;
      state.error = null;
    });
    builder.addCase(checkAvailableEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkAvailableEmail.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setUser, setLoading, setError, logout, clearError } =
  userSlice.actions;
export default userSlice.reducer;

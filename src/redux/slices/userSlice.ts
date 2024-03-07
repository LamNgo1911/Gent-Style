import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosApi } from "../../config/axiosApi";
import { errorMessages } from "../../misc/errorMessages";
import { User, UserRegistration, UserState } from "../../misc/types";

let userState: User | null = null;
const userData = localStorage.getItem("userInformation");

let accessTokenState: string | null = null;
const accessTokenData = localStorage.getItem("token");

if (userData) {
  userState = JSON.parse(userData);
}

if (accessTokenData) {
  accessTokenState = accessTokenData;
}

const initialState: UserState = {
  user: userState,
  isLoading: false,
  error: null,
  isAvailableEmail: false,
  access_token: accessTokenData,
};

export type LoginInfo = {
  email: string;
  password: string;
};

export const fetchLogin = createAsyncThunk<User, string>(
  "user/fetchLogin",
  async (access_token, { rejectWithValue }) => {
    try {
      const userData = await axiosApi.get("auth/profile", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return userData.data;
    } catch (error: any) {
      return rejectWithValue(errorMessages[error.response.status]);
    }
  }
);

export const fetchAccessToken = createAsyncThunk<string, LoginInfo>(
  "user/fetchAccessToken",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const tokenData = await axiosApi.post("auth/login", {
        email: loginInfo.email,
        password: loginInfo.password,
      });

      return tokenData.data.access_token;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchRegister = createAsyncThunk<User, UserRegistration>(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("users/", user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
    clearError: (state) => {
      state.error = null;
    },
    clearAccessToken: (state) => {
      state.user = null;
      state.access_token = null;
      localStorage.removeItem("userInformation");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // check email available
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

    // login
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
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

    // regiter
    builder.addCase(fetchRegister.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // access-token
    builder.addCase(fetchAccessToken.fulfilled, (state, action) => {
      state.access_token = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchAccessToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAccessToken.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
  },
});

export const { setUser, setLoading, setError, clearError, clearAccessToken } =
  userSlice.actions;
export default userSlice.reducer;

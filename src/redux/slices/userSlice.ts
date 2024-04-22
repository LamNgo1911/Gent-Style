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
  access_token: accessTokenState,
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type UserInformation = {
  user: User;
  access_token: string;
  refresh_token: string;
};

export type UserInformationGoogle = {
  user: User;
  access_token: string;
  refresh_token: string;
};

// export const fetchLogin = createAsyncThunk<User, string>(
//   "user/fetchLogin",
//   async (access_token, { rejectWithValue }) => {
//     try {
//       const userData = await axiosApi.get("auth/profile", {
//         headers: { Authorization: `Bearer ${access_token}` },
//       });
//       return userData.data;
//     } catch (error: any) {
//       return rejectWithValue(errorMessages[error.response.status]);
//     }
//   }
// );

export const fetchRegister = createAsyncThunk<User, UserRegistration>(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("users/register", user);

      return response.data.newUser;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchLogin = createAsyncThunk<UserInformation, LoginInfo>(
  "user/fetchLogin",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const userData = await axiosApi.post("users/login", {
        email: loginInfo.email,
        password: loginInfo.password,
      });

      return userData.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchLoginGoogle = createAsyncThunk<UserInformation>(
  "user/fetchLoginGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const userData = await axiosApi.post("users/google-authenticate", {});

      return userData.data;
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
    // regiter
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.user = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload as string;
    });

    // login
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
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

    // login google
    builder.addCase(fetchLoginGoogle.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchLoginGoogle.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLoginGoogle.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setUser, setLoading, setError, clearError, clearAccessToken } =
  userSlice.actions;
export default userSlice.reducer;

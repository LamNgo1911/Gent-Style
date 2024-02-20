import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  avatar: string;
};

type UserState = {
  currentUser: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, actions: PayloadAction<User>) {
      state.currentUser = actions.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setUser,
  clearUser,
  startLoading,
  stopLoading,
  setError,
  clearError,
} = userSlice.actions;
export default userSlice.reducer;

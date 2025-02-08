import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  notifications: boolean;
  theme: 'light' | 'dark';
}

interface UserState {
  username: string | null;
  reportCount: number;
  preferences: UserPreferences;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  username: null,
  reportCount: 0,
  preferences: {
    notifications: true,
    theme: 'light',
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    incrementReportCount: (state) => {
      state.reportCount += 1;
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    logout: (state) => {
      state.username = null;
      state.isAuthenticated = false;
      state.reportCount = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  incrementReportCount,
  updatePreferences,
  logout,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer; 
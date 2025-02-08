import { configureStore } from '@reduxjs/toolkit';
import gymSlice from './slices/gymSlice';
import userSlice from './slices/userSlice';
import leaderboardSlice from './slices/leaderboardSlice';

export const store = configureStore({
  reducer: {
    gym: gymSlice,
    user: userSlice,
    leaderboard: leaderboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LeaderboardPeriod = 'weekly' | 'monthly';

interface LeaderboardEntry {
  username: string;
  reportCount: number;
  rank: number;
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
  selectedPeriod: LeaderboardPeriod;
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  entries: [
    { username: "GymWarrior", reportCount: 47, rank: 1 },
    { username: "FitnessFreak", reportCount: 42, rank: 2 },
    { username: "WorkoutPro", reportCount: 38, rank: 3 },
    { username: "GymBuddy", reportCount: 35, rank: 4 },
    { username: "ActiveAthlete", reportCount: 31, rank: 5 },
    { username: "HealthyHero", reportCount: 28, rank: 6 },
    { username: "PowerLifter", reportCount: 25, rank: 7 },
    { username: "FitnessFanatic", reportCount: 22, rank: 8 },
    { username: "GymGoer", reportCount: 19, rank: 9 },
    { username: "WorkoutWizard", reportCount: 17, rank: 10 }
  ],
  selectedPeriod: 'weekly',
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboard: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.entries = action.payload;
    },
    setSelectedPeriod: (state, action: PayloadAction<LeaderboardPeriod>) => {
      state.selectedPeriod = action.payload;
    },
    updateUserRank: (state, action: PayloadAction<{ username: string; reportCount: number }>) => {
      const { username, reportCount } = action.payload;
      const existingEntry = state.entries.find(entry => entry.username === username);
      
      if (existingEntry) {
        existingEntry.reportCount = reportCount;
        // Re-sort and update ranks
        state.entries.sort((a, b) => b.reportCount - a.reportCount);
        state.entries.forEach((entry, index) => {
          entry.rank = index + 1;
        });
      }
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
  setLeaderboard,
  setSelectedPeriod,
  updateUserRank,
  setLoading,
  setError,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer; 
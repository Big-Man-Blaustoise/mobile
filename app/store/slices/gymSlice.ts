import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GymCrowdedness = 'empty' | 'light' | 'moderate' | 'busy' | 'packed';

interface Gym {
  id: string;
  name: string;
  currentCrowdedness: GymCrowdedness;
  lastUpdated: string;
}

interface GymState {
  gyms: Gym[];
  selectedGym: Gym | null;
  historicalData: {
    [gymId: string]: {
      date: string;
      crowdedness: GymCrowdedness;
    }[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: GymState = {
  gyms: [
    {
      id: 'tepper',
      name: 'Tepper Gym',
      currentCrowdedness: 'light',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'cohon',
      name: 'Cohon Gym',
      currentCrowdedness: 'light',
      lastUpdated: new Date().toISOString(),
    },
  ],
  selectedGym: null,
  historicalData: {},
  loading: false,
  error: null,
};

const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    setSelectedGym: (state, action: PayloadAction<string>) => {
      state.selectedGym = state.gyms.find(gym => gym.id === action.payload) || null;
    },
    updateGymCrowdedness: (state, action: PayloadAction<{ gymId: string; crowdedness: GymCrowdedness }>) => {
      const gym = state.gyms.find(g => g.id === action.payload.gymId);
      if (gym) {
        gym.currentCrowdedness = action.payload.crowdedness;
        gym.lastUpdated = new Date().toISOString();
      }
    },
    setHistoricalData: (state, action: PayloadAction<{ gymId: string; data: { date: string; crowdedness: GymCrowdedness }[] }>) => {
      state.historicalData[action.payload.gymId] = action.payload.data;
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
  setSelectedGym,
  updateGymCrowdedness,
  setHistoricalData,
  setLoading,
  setError,
} = gymSlice.actions;

export default gymSlice.reducer; 
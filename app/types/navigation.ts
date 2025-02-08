import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabs: undefined;
  CheckIn: {
    gymId: string;
    gymName: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Leaderboard: undefined;
  Preferences: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>; 
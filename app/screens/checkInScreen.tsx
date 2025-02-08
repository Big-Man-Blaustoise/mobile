import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Title, Button, useTheme } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootState } from '../store/store';
import { updateGymCrowdedness, GymCrowdedness } from '../store/slices/gymSlice';

type RouteParams = {
  gymId: string;
  gymName: string;
};

export default function CheckInScreen() {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { gymId, gymName } = route.params as RouteParams;

  const handleCrowdednessReport = (crowdedness: GymCrowdedness) => {
    dispatch(updateGymCrowdedness({ gymId, crowdedness }));
    navigation.goBack();
  };

  const crowdednessLevels: { level: GymCrowdedness; label: string; color: string }[] = [
    { level: 'empty', label: 'Empty', color: '#4CAF50' },
    { level: 'light', label: 'Light Traffic', color: '#8BC34A' },
    { level: 'moderate', label: 'Moderate', color: '#FFC107' },
    { level: 'busy', label: 'Busy', color: '#FF9800' },
    { level: 'packed', label: 'Packed', color: theme.colors.error || '#F44336' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
        <Card.Content>
          <Title style={[styles.title, { color: theme.colors.onSurface }]}>
            How crowded is {gymName}?
          </Title>
          <View style={styles.buttonContainer}>
            {crowdednessLevels.map(({ level, label, color }) => (
              <Button
                key={level}
                mode="contained"
                onPress={() => handleCrowdednessReport(level)}
                style={[styles.button, { backgroundColor: color }]}
                labelStyle={{ color: theme.colors.surface }}
              >
                {label}
              </Button>
            ))}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
  },
}); 
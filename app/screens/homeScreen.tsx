import React from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Title, Paragraph, Button, useTheme, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { RootState } from '../store/store';
import { setSelectedGym, GymCrowdedness } from '../store/slices/gymSlice';
import { RootStackNavigationProp } from '../types/navigation';

const { width } = Dimensions.get('window');

// Map of gym IDs to their image modules
const gymImages = {
  tepper: require('../../assets/images/tepper_gym.jpg'),
  cohon: require('../../assets/images/cohon_gym.jpg'),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 8,
  },
  card: {
    elevation: 4,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: width * 0.5, // Maintain 2:1 aspect ratio
  },
  statusContainer: {
    marginTop: 12,
    marginBottom: 4,
  },
  crowdednessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  statusTextContainer: {
    flex: 1,
    marginLeft: -8, // Adjust for IconButton padding
  },
  crowdednessBar: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  crowdednessIndicator: {
    flex: 1,
    marginHorizontal: 1,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 4,
  },
  button: {
    borderRadius: 8,
    minWidth: 120,
  },
});

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch = useDispatch();
  const { gyms } = useSelector((state: RootState) => state.gym);
  console.log("gyms", gyms);
  const getCrowdednessColor = (crowdedness: GymCrowdedness) => {
    switch (crowdedness) {
      case 'empty':
        return '#4CAF50'; // Green
      case 'light':
        return '#8BC34A'; // Light Green
      case 'moderate':
        return '#FFC107'; // Amber
      case 'busy':
        return '#FF9800'; // Orange
      case 'packed':
        return theme.colors.error || '#F44336'; // Red
      default:
        return theme.colors.surfaceVariant;
    }
  };

  const getCrowdednessText = (crowdedness: GymCrowdedness) => {
    switch (crowdedness) {
      case 'empty':
        return 'Empty';
      case 'light':
        return 'Light Traffic';
      case 'moderate':
        return 'Moderate';
      case 'busy':
        return 'Busy';
      case 'packed':
        return 'Packed';
      default:
        return 'Unknown';
    }
  };

  const getCrowdednessIcon = (crowdedness: GymCrowdedness) => {
    switch (crowdedness) {
      case 'empty':
        return 'emoticon-happy-outline';
      case 'light':
        return 'emoticon-happy-outline';
      case 'moderate':
        return 'emoticon-neutral-outline';
      case 'busy':
        return 'emoticon-sad-outline';
      case 'packed':
        return 'emoticon-cry-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const handleGymSelect = (gymId: string) => {
    dispatch(setSelectedGym(gymId));
  };

  const handleCheckIn = (gymId: string, gymName: string) => {
    navigation.navigate('CheckIn', { gymId, gymName });
  };
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      {gyms.map((gym) => (
        <Card
          key={gym.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outline,
            }
          ]}
          onPress={() => handleGymSelect(gym.id)}
        >
          <Image
            source={gymImages[gym.id as keyof typeof gymImages]}
            style={styles.image}
            resizeMode="cover"
          />
          <Card.Content>
            <Title style={[{ color: theme.colors.onSurface, marginTop: 12 }]}>{gym.name}</Title>
            <View style={styles.statusContainer}>
              <View style={styles.crowdednessContainer}>
                <IconButton
                  icon={getCrowdednessIcon(gym.currentCrowdedness)}
                  size={28}
                  iconColor={getCrowdednessColor(gym.currentCrowdedness)}
                />
                <View style={styles.statusTextContainer}>
                  <Paragraph style={{ color: theme.colors.onSurface, fontSize: 16 }}>
                    {getCrowdednessText(gym.currentCrowdedness)}
                  </Paragraph>
                  <Paragraph style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }}>
                    Last Updated: {new Date(gym.lastUpdated).toLocaleTimeString()}
                  </Paragraph>
                </View>
              </View>
              <View style={[styles.crowdednessBar, { backgroundColor: theme.colors.surfaceVariant }]}>
                {(['empty', 'light', 'moderate', 'busy', 'packed'] as GymCrowdedness[]).map((level) => (
                  <View
                    key={level}
                    style={[
                      styles.crowdednessIndicator,
                      {
                        backgroundColor: level === gym.currentCrowdedness
                          ? getCrowdednessColor(level)
                          : theme.colors.surfaceVariant,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              buttonColor={theme.colors.primary}
              textColor={theme.colors.surface}
              onPress={() => handleCheckIn(gym.id, gym.name)}
              style={styles.button}
            >
              Check In
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
} 
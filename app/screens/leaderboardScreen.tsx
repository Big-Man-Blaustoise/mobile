import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Title, Paragraph, List, Avatar, useTheme, SegmentedButtons } from 'react-native-paper';
import { RootState } from '../store/store';
import { setSelectedPeriod, LeaderboardPeriod } from '../store/slices/leaderboardSlice';

export default function LeaderboardScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { entries, selectedPeriod } = useSelector((state: RootState) => state.leaderboard);
  const currentUsername = useSelector((state: RootState) => state.user.username);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return theme.colors.onSurface;
    }
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '👑';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.topCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
        <Card.Content>
          <Title style={[styles.title, { color: theme.colors.onSurface }]}>Top Contributors</Title>
          <SegmentedButtons
            value={selectedPeriod}
            onValueChange={(value) => dispatch(setSelectedPeriod(value as LeaderboardPeriod))}
            buttons={[
              { value: 'weekly', label: 'This Week' },
              { value: 'monthly', label: 'This Month' },
            ]}
            style={styles.segmentedButtons}
          />
          <Paragraph style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Based on number of reports submitted
          </Paragraph>
        </Card.Content>
      </Card>

      {entries.map((entry) => (
        <Card
          key={entry.username}
          style={[
            styles.rankCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outline,
            },
            currentUsername === entry.username && {
              backgroundColor: theme.colors.primary + '20', // 20% opacity
            },
          ]}
        >
          <Card.Content>
            <View style={styles.rankRow}>
              <View style={styles.rankInfo}>
                <Title style={[styles.rank, { color: getRankColor(entry.rank) }]}>
                  #{entry.rank} {getRankEmoji(entry.rank)}
                </Title>
                <View style={styles.userInfo}>
                  <Avatar.Text
                    size={40}
                    label={entry.username.substring(0, 2).toUpperCase()}
                    color={theme.colors.surface}
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <Title style={[styles.username, { color: theme.colors.onSurface }]}>
                    {entry.username}
                    {currentUsername === entry.username && ' (You)'}
                  </Title>
                </View>
              </View>
              <View style={styles.stats}>
                <Title style={{ color: theme.colors.onSurface }}>{entry.reportCount}</Title>
                <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>Reports</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topCard: {
    marginBottom: 16,
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
    marginBottom: 4,
  },
  rankCard: {
    marginBottom: 8,
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankInfo: {
    flex: 1,
  },
  rank: {
    fontSize: 18,
    marginBottom: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 12,
    fontSize: 16,
  },
  stats: {
    alignItems: 'center',
  },
  segmentedButtons: {
    marginVertical: 12,
  },
  subtitle: {
    marginTop: 4,
    textAlign: 'center',
  },
}); 
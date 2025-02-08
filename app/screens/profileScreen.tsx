import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Card, Title, Paragraph, Divider, useTheme } from 'react-native-paper';
import { RootState } from '../store/store';

const defaultAvatar = require('../../assets/images/scotty_dawg.png');

export default function ProfileScreen() {
  const theme = useTheme();
  const { username, reportCount } = useSelector((state: RootState) => state.user);
  const { entries } = useSelector((state: RootState) => state.leaderboard);

  const userRank = entries.find(entry => entry.username === username)?.rank || 0;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.profileCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
        <View style={styles.avatarContainer}>
          <Image
            source={defaultAvatar}
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
          />
        </View>
        <Card.Content>
          <Title style={[styles.username, { color: theme.colors.onSurface }]}>
            {username || 'Guest User'}
          </Title>
          <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Title style={{ color: theme.colors.onSurface }}>{reportCount}</Title>
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>Reports</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={{ color: theme.colors.onSurface }}>#{userRank}</Title>
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>Rank</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.activityCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
        <Card.Content>
          <Title style={{ color: theme.colors.onSurface }}>Recent Activity</Title>
          <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
            You have submitted {reportCount} crowdedness reports.
            {reportCount > 0
              ? ' Keep up the good work!'
              : ' Start reporting to help others!'}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={[styles.achievementsCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
        <Card.Content>
          <Title style={{ color: theme.colors.onSurface }}>Achievements</Title>
          <View style={styles.achievementsList}>
            {reportCount >= 1 && (
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                🏅 First Report Submitted
              </Paragraph>
            )}
            {reportCount >= 5 && (
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                🏆 Regular Reporter
              </Paragraph>
            )}
            {reportCount >= 10 && (
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                ⭐ Dedicated Contributor
              </Paragraph>
            )}
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
  profileCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    textAlign: 'center',
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
    height: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  activityCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementsCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementsList: {
    marginTop: 8,
  },
}); 
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  Switch,
  Divider,
  Text,
  RadioButton,
  useTheme,
  Card,
  Title,
} from 'react-native-paper';
import { RootState } from '../store/store';
import { updatePreferences } from '../store/slices/userSlice';

export default function PreferencesScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.user.preferences);

  const handleNotificationsToggle = () => {
    dispatch(updatePreferences({ notifications: !preferences.notifications }));
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    dispatch(updatePreferences({ theme: newTheme }));
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
        <Card.Content>
          <Title style={{ color: theme.colors.onSurface, marginBottom: 8 }}>Notifications</Title>
          <List.Item
            title="Push Notifications"
            titleStyle={{ color: theme.colors.onSurface }}
            description="Receive updates about gym crowdedness"
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            right={() => (
              <Switch
                value={preferences.notifications}
                onValueChange={handleNotificationsToggle}
                color={theme.colors.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
        <Card.Content>
          <Title style={{ color: theme.colors.onSurface, marginBottom: 16 }}>Theme</Title>
          <View style={styles.themeOptions}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                {
                  backgroundColor: preferences.theme === 'light' ? theme.colors.primary : theme.colors.surface,
                  borderColor: theme.colors.outline,
                },
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <Text style={[
                styles.themeText,
                { color: preferences.theme === 'light' ? theme.colors.surface : theme.colors.onSurface }
              ]}>
                Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeOption,
                {
                  backgroundColor: preferences.theme === 'dark' ? theme.colors.primary : theme.colors.surface,
                  borderColor: theme.colors.outline,
                },
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <Text style={[
                styles.themeText,
                { color: preferences.theme === 'dark' ? theme.colors.surface : theme.colors.onSurface }
              ]}>
                Dark
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
        <Card.Content>
          <Title style={{ color: theme.colors.onSurface, marginBottom: 8 }}>About</Title>
          <List.Item
            title="Version"
            titleStyle={{ color: theme.colors.onSurface }}
            description="1.0.0"
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
          <Divider style={{ backgroundColor: theme.colors.outline, height: 1 }} />
          <List.Item
            title="Terms of Service"
            titleStyle={{ color: theme.colors.onSurface }}
            onPress={() => {/* TODO: Implement terms of service navigation */}}
          />
          <Divider style={{ backgroundColor: theme.colors.outline, height: 1 }} />
          <List.Item
            title="Privacy Policy"
            titleStyle={{ color: theme.colors.onSurface }}
            onPress={() => {/* TODO: Implement privacy policy navigation */}}
          />
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
  section: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  themeOption: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { withOpacity } from '../utils/color';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { id: '1', title: 'Edit Profile', icon: 'person', action: () => {} },
        { id: '2', title: 'Change Password', icon: 'lock-closed', action: () => {} },
        { id: '3', title: 'Privacy Settings', icon: 'shield-checkmark', action: () => {} },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: '4',
          title: 'Push Notifications',
          icon: 'notifications',
          toggle: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          id: '5',
          title: 'Email Notifications',
          icon: 'mail',
          toggle: true,
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
        {
          id: '6',
          title: 'SMS Notifications',
          icon: 'chatbubble',
          toggle: true,
          value: smsNotifications,
          onToggle: setSmsNotifications,
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { id: '7', title: 'Language', icon: 'language', action: () => {}, rightText: 'English' },
        { id: '8', title: 'Currency', icon: 'cash', action: () => {}, rightText: 'USD' },
        { id: '9', title: 'Theme', icon: 'color-palette', action: () => {}, rightText: 'Light' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: '10', title: 'Help Center', icon: 'help-circle', action: () => {} },
        { id: '11', title: 'Contact Us', icon: 'mail', action: () => {} },
        { id: '12', title: 'About', icon: 'information-circle', action: () => {} },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            {group.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.settingItem}
                onPress={item.action}
                activeOpacity={item.toggle ? 1 : 0.7}
                disabled={!!item.toggle}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={item.icon} size={22} color={colors.primary} />
                  </View>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                </View>
                <View style={styles.settingRight}>
                  {item.toggle ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={colors.background}
                    />
                  ) : (
                    <>
                      {item.rightText && (
                        <Text style={[styles.rightText, { marginRight: spacing.sm }]}>{item.rightText}</Text>
                      )}
                      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  settingsGroup: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  groupTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: withOpacity(colors.primary, 0.08),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  versionContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  versionText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});


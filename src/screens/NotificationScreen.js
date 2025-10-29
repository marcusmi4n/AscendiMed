import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { withOpacity } from '../utils/color';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Smith is tomorrow at 10:00 AM',
    time: '2 hours ago',
    type: 'appointment',
    read: false,
  },
  {
    id: '2',
    title: 'Prescription Ready',
    message: 'Your prescription is ready for pickup',
    time: '5 hours ago',
    type: 'prescription',
    read: false,
  },
  {
    id: '3',
    title: 'Health Report',
    message: 'Your lab results are now available',
    time: '1 day ago',
    type: 'report',
    read: true,
  },
  {
    id: '4',
    title: 'Payment Received',
    message: 'Your payment of $150 has been processed',
    time: '2 days ago',
    type: 'payment',
    read: true,
  },
];

export default function NotificationScreen() {
  const getIcon = (type) => {
    switch (type) {
      case 'appointment':
        return 'calendar';
      case 'prescription':
        return 'medical';
      case 'report':
        return 'document-text';
      case 'payment':
        return 'card';
      default:
        return 'notifications';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'appointment':
        return colors.primary;
      case 'prescription':
        return colors.secondary;
      case 'report':
        return colors.info;
      case 'payment':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {NOTIFICATIONS.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        ) : (
          NOTIFICATIONS.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.unreadCard,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: withOpacity(getIconColor(notification.type), 0.12) },
                  ]}
                >
                  <Ionicons
                    name={getIcon(notification.type)}
                    size={24}
                    color={getIconColor(notification.type)}
                  />
                </View>
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
  },
  markAllRead: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  unreadCard: {
    backgroundColor: colors.surfaceLight,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  notificationTitle: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },
  notificationMessage: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  notificationTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});


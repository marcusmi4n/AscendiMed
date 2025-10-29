import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import { withOpacity } from '../utils/color';

export default function ProfileScreen({ navigation }) {
  const menuItems = [
    { id: '1', title: 'My Appointments', icon: 'calendar', screen: 'BookAppointment', color: colors.primary },
    { id: '2', title: 'My Membership', icon: 'card', screen: 'MyMembership', color: colors.accent },
    { id: '3', title: 'Medical Records', icon: 'document-text', screen: null, color: colors.info },
    { id: '4', title: 'Prescriptions', icon: 'medical', screen: null, color: colors.secondary },
    { id: '5', title: 'Emergency Contacts', icon: 'call', screen: null, color: colors.sos },
    { id: '6', title: 'Settings', icon: 'settings', screen: 'Settings', color: colors.textSecondary },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={60} color={colors.primary} />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="camera" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Text style={styles.userPhone}>+1 234 567 8900</Text>
        </Card>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => item.screen && navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: withOpacity(item.color, 0.12) }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out" size={24} color={colors.error} />
          <Text style={[styles.logoutText, { marginLeft: spacing.sm }]}>Logout</Text>
        </TouchableOpacity>
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
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textLight,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    padding: spacing.xl,
    margin: spacing.lg,
    marginBottom: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: withOpacity(colors.primary, 0.12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  userName: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  userPhone: {
    ...typography.body,
    color: colors.textSecondary,
  },
  menuSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuTitle: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: withOpacity(colors.error, 0.12),
    borderRadius: 12,
  },
  logoutText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
});


import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import { withOpacity } from '../utils/color';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const quickActions = [
    { id: '1', title: 'Book Appointment', icon: 'calendar', color: colors.primary, screen: 'BookAppointment' },
    { id: '2', title: 'Live Chat', icon: 'chatbubbles', color: colors.secondary, screen: 'Chat' },
    { id: '3', title: 'Emergency SOS', icon: 'warning', color: colors.sos, screen: 'LiveSOS' },
    { id: '4', title: 'My Membership', icon: 'card', color: colors.accent, screen: 'MyMembership' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications" size={28} color={colors.textLight} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>Search doctors, services...</Text>
          </View>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.iconCircle, { backgroundColor: withOpacity(action.color, 0.12) }]}>
                  <Ionicons name={action.icon} size={32} color={action.color} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.appointmentsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorAvatar}>
                  <Ionicons name="person" size={24} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.doctorName}>Dr. Sarah Johnson</Text>
                  <Text style={styles.doctorSpecialty}>Cardiologist</Text>
                </View>
              </View>
            </View>
            <View style={styles.appointmentDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={16} color={colors.textSecondary} />
                <Text style={styles.detailText}>Tomorrow, March 15</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time" size={16} color={colors.textSecondary} />
                <Text style={styles.detailText}>10:00 AM</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.healthTipsSection}>
          <Text style={styles.sectionTitle}>Health Tips</Text>
          <Card style={styles.tipCard}>
            <Text style={styles.tipTitle}>Stay Hydrated</Text>
            <Text style={styles.tipDescription}>
              Drink at least 8 glasses of water daily to maintain optimal health and energy levels.
            </Text>
          </Card>
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
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...typography.body,
    color: colors.textLight,
    opacity: 0.9,
  },
  userName: {
    ...typography.h2,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.sos,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.caption,
    color: colors.textLight,
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  searchPlaceholder: {
    ...typography.body,
    color: colors.textSecondary,
  },
  quickActionsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickActionCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  appointmentsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAllText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  appointmentCard: {
    padding: spacing.lg,
  },
  appointmentHeader: {
    marginBottom: spacing.md,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: withOpacity(colors.primary, 0.12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  doctorName: {
    ...typography.h3,
    color: colors.text,
  },
  doctorSpecialty: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  appointmentDetails: {
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  healthTipsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  tipCard: {
    padding: spacing.lg,
  },
  tipTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tipDescription: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});


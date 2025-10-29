import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

export default function MyMembershipScreen({ navigation }) {
  const membershipStatus = {
    plan: 'Premium',
    status: 'Active',
    renewalDate: '2024-03-15',
    memberSince: '2023-03-15',
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Membership</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.membershipCard}>
          <View style={styles.membershipHeader}>
            <Text style={styles.planName}>{membershipStatus.plan} Plan</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{membershipStatus.status}</Text>
            </View>
          </View>
          <View style={styles.membershipDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={20} color={colors.textLight} />
              <Text style={styles.detailText}>
                Renews on {membershipStatus.renewalDate}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time" size={20} color={colors.textLight} />
              <Text style={styles.detailText}>
                Member since {membershipStatus.memberSince}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Your Benefits</Text>
          {[
            'Unlimited consultations',
            'Priority appointments',
            '24/7 chat support',
            'SOS emergency feature',
            'Family coverage (up to 4)',
            'Discounts on lab tests',
          ].map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsSection}>
          <Button
            title="Upgrade Plan"
            onPress={() => navigation.navigate('Membership')}
            variant="primary"
            style={styles.actionButton}
          />
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Membership</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          {[
            { date: '2024-02-15', amount: '$49.00', status: 'Paid' },
            { date: '2024-01-15', amount: '$49.00', status: 'Paid' },
            { date: '2023-12-15', amount: '$49.00', status: 'Paid' },
          ].map((payment, index) => (
            <View key={index} style={styles.paymentRow}>
              <View>
                <Text style={styles.paymentDate}>{payment.date}</Text>
                <Text style={styles.paymentStatus}>{payment.status}</Text>
              </View>
              <Text style={styles.paymentAmount}>{payment.amount}</Text>
            </View>
          ))}
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
  gradient: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textLight,
  },
  placeholder: {
    width: 40,
  },
  membershipCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  membershipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  planName: {
    ...typography.h1,
    color: colors.textLight,
  },
  statusBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    color: colors.textLight,
    fontWeight: '600',
  },
  membershipDetails: {
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailText: {
    ...typography.body,
    color: colors.textLight,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  benefitsSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  benefitText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  actionsSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  cancelButton: {
    padding: spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
  historySection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  paymentDate: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  paymentStatus: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  paymentAmount: {
    ...typography.h3,
    color: colors.primary,
  },
});


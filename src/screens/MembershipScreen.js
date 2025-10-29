import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { withOpacity } from '../utils/color';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$29',
    period: '/month',
    features: [
      'Unlimited consultations',
      '24/7 chat support',
      'Basic health records',
      'Prescription management',
    ],
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$49',
    period: '/month',
    features: [
      'Everything in Basic',
      'Priority appointments',
      'Advanced health records',
      'Family coverage (up to 4)',
      'SOS emergency feature',
      'Discounts on lab tests',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Premium',
      'Unlimited family members',
      'Personal health advisor',
      'Annual health checkups',
      'Home visit consultations',
      'VIP support',
    ],
    popular: false,
  },
];

export default function MembershipScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Membership Plans</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>
          Choose the plan that best fits your healthcare needs
        </Text>

        {PLANS.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.planCardSelected,
              plan.popular && styles.popularCard,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Most Popular</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>{plan.period}</Text>
              </View>
            </View>
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            {selectedPlan === plan.id && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              </View>
            )}
          </TouchableOpacity>
        ))}

        <Button
          title="Continue to Checkout"
          onPress={() => navigation.navigate('MembershipCheckout', { plan: selectedPlan })}
          variant="primary"
          style={styles.checkoutButton}
        />
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
    padding: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  planCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: colors.primary,
    backgroundColor: withOpacity(colors.primary, 0.06),
  },
  popularCard: {
    borderColor: colors.accent,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: spacing.lg,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  popularText: {
    ...typography.caption,
    color: colors.textLight,
    fontWeight: '600',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  planName: {
    ...typography.h2,
    color: colors.text,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    ...typography.h1,
    color: colors.primary,
  },
  period: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  featuresContainer: {
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
  },
  checkoutButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});


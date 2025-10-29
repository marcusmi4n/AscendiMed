import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { withOpacity } from '../utils/color';

export default function MembershipCheckoutScreen({ route, navigation }) {
  const { plan } = route.params || { plan: 'premium' };
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const planPrices = {
    basic: 29,
    premium: 49,
    enterprise: 99,
  };

  const total = planPrices[plan] || 49;
  const tax = total * 0.1;
  const finalTotal = total + tax;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.planSummary}>
          <Text style={styles.sectionTitle}>Plan Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{plan.charAt(0).toUpperCase() + plan.slice(1)} Plan</Text>
            <Text style={styles.summaryValue}>${planPrices[plan]}/month</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${finalTotal.toFixed(2)}/month</Text>
          </View>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={colors.textSecondary}
              value={cardName}
              onChangeText={setCardName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={colors.textSecondary}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor={colors.textSecondary}
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor={colors.textSecondary}
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        <View style={styles.securityNote}>
          <Ionicons name="lock-closed" size={20} color={colors.success} />
          <Text style={styles.securityText}>
            Your payment information is secure and encrypted
          </Text>
        </View>

        <Button
          title={`Pay $${finalTotal.toFixed(2)}/month`}
          onPress={() => {
            alert('Payment successful! Membership activated.');
            navigation.navigate('MyMembership');
          }}
          variant="primary"
          style={styles.payButton}
          disabled={!cardNumber || !expiryDate || !cvv || !cardName}
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
  planSummary: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.text,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary,
  },
  paymentSection: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceLight,
    color: colors.text,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  halfInput: {
    flex: 1,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: withOpacity(colors.success, 0.12),
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.xl,
  },
  securityText: {
    ...typography.caption,
    color: colors.success,
    flex: 1,
  },
  payButton: {
    marginBottom: spacing.xl,
  },
});


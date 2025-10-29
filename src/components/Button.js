import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  style,
  disabled = false 
}) {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabledButton: {
    backgroundColor: colors.surface,
    opacity: 0.5,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.textLight,
  },
  secondaryText: {
    color: '#000000',
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.textSecondary,
  },
});


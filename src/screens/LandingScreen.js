import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import { colors, spacing, typography } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>AscendiMed</Text>
            <Text style={styles.tagline}>Your Trusted Health Companion</Text>
          </View>

          <View style={styles.imageContainer}>
            <View style={styles.placeholderImage} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Get Quality Healthcare</Text>
            <Text style={styles.subtitle}>
              Connect with licensed doctors, book appointments, and manage your health with ease.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.textLight }]}
              onPress={() => navigation.navigate('Onboarding')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.outlineButton, { borderColor: colors.textLight }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.outlineButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  logo: {
    ...typography.h1,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.body,
    color: colors.textLight,
    opacity: 0.9,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  placeholderImage: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
  primaryButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  outlineButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    ...typography.body,
    color: colors.textLight,
    fontWeight: '600',
  },
});


import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LiveSOSScreen() {
  const [isActive, setIsActive] = useState(false);
  const pulseAnimations = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)])
    .current;

  useEffect(() => {
    const animationLoops = pulseAnimations.map((animation, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 400),
          Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );

    if (isActive) {
      animationLoops.forEach((loop) => loop.start());
    } else {
      animationLoops.forEach((loop) => loop.stop());
      pulseAnimations.forEach((animation) => animation.setValue(0));
    }

    return () => {
      animationLoops.forEach((loop) => loop.stop());
    };
  }, [isActive, pulseAnimations]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.header, isActive && styles.headerActive]}>
        <Text style={styles.headerTitle}>Emergency SOS</Text>
        <Text style={styles.headerSubtitle}>
          {isActive ? 'Emergency services notified' : 'Tap the button below for emergency assistance'}
        </Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.sosButton, isActive && styles.sosButtonActive]}
          onPress={() => setIsActive(!isActive)}
          activeOpacity={0.8}
        >
          <View style={styles.buttonInner}>
            <Ionicons
              name={isActive ? 'checkmark-circle' : 'warning'}
              size={80}
              color={colors.textLight}
            />
            <Text style={styles.sosButtonText}>
              {isActive ? 'Emergency Active' : 'Tap for SOS'}
            </Text>
          </View>
          {isActive && (
            <View style={styles.pulseContainer} pointerEvents="none">
              {pulseAnimations.map((animation, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.pulse,
                    {
                      opacity: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 0],
                      }),
                      transform: [
                        {
                          scale: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.6],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Ionicons name="location" size={24} color={colors.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Location</Text>
              <Text style={styles.infoValue}>Sharing your location...</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="call" size={24} color={colors.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Emergency Contact</Text>
              <Text style={styles.infoValue}>911</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="time" size={24} color={colors.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Response Time</Text>
              <Text style={styles.infoValue}>~5 minutes</Text>
            </View>
          </View>
        </View>

        {isActive && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsActive(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel Emergency</Text>
          </TouchableOpacity>
        )}
      </View>
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
    alignItems: 'center',
  },
  headerActive: {
    backgroundColor: colors.sos,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  sosButton: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: colors.sos,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    elevation: 8,
    shadowColor: colors.sos,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  sosButtonActive: {
    backgroundColor: colors.success,
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosButtonText: {
    ...typography.h3,
    color: colors.textLight,
    marginTop: spacing.md,
  },
  pulseContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  pulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: width * 0.3,
    borderWidth: 2,
    borderColor: colors.success,
  },
  infoContainer: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTextContainer: {
    marginLeft: spacing.md,
    flex: 1,
  },
  infoTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});


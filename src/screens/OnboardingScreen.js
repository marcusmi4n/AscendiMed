import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import { colors, spacing, typography } from '../constants/theme';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Book Appointments',
    description: 'Schedule appointments with qualified doctors at your convenience',
  },
  {
    title: '24/7 Support',
    description: 'Get medical assistance anytime, anywhere with our SOS feature',
  },
  {
    title: 'Health Records',
    description: 'Keep track of your medical history and prescriptions',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const page = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentPage(page);
        }}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={styles.page}>
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <View style={styles.iconPlaceholder} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentPage && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentPage === onboardingData.length - 1 ? (
            <Button
              title="Get Started"
              onPress={() => navigation.navigate('CreateAccount')}
              variant="primary"
              style={[styles.button, { marginBottom: spacing.md }]}
            />
          ) : (
            <Button
              title="Next"
              onPress={() => {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
              }}
              variant="primary"
              style={[styles.button, { marginBottom: spacing.md }]}
            />
          )}
          <Button
            title="Skip"
            onPress={() => navigation.navigate('CreateAccount')}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  iconPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: colors.surface,
    borderRadius: 60,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: colors.primary,
  },
  buttonContainer: {
  },
  button: {
    width: '100%',
  },
});


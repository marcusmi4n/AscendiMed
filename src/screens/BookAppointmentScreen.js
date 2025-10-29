import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { withOpacity } from '../utils/color';

const DOCTORS = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', rating: 4.8, image: null },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'General Practitioner', rating: 4.9, image: null },
  { id: '3', name: 'Dr. Emily Davis', specialty: 'Dermatologist', rating: 4.7, image: null },
];

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

export default function BookAppointmentScreen({ navigation }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select Doctor</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.doctorsList}>
          {DOCTORS.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={[
                styles.doctorCard,
                selectedDoctor?.id === doctor.id && styles.doctorCardSelected,
              ]}
              onPress={() => setSelectedDoctor(doctor)}
            >
              <View style={styles.doctorImage}>
                <Ionicons name="person" size={40} color={colors.textSecondary} />
              </View>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={colors.warning} />
                <Text style={styles.rating}>{doctor.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Select Date</Text>
        <View style={styles.dateContainer}>
          {['Today', 'Tomorrow', 'Mon', 'Tue', 'Wed'].map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                selectedDate === date && styles.dateButtonSelected,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === date && styles.dateTextSelected,
                ]}
              >
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeContainer}>
          {TIME_SLOTS.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.timeButtonSelected,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextSelected,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Reason for Visit</Text>
        <TextInput
          style={styles.reasonInput}
          placeholder="Describe your symptoms or reason for visit..."
          placeholderTextColor={colors.textSecondary}
          value={reason}
          onChangeText={setReason}
          multiline
          numberOfLines={4}
        />

        <Button
          title="Confirm Appointment"
          onPress={() => {
            alert('Appointment booked successfully!');
            navigation.goBack();
          }}
          variant="primary"
          style={styles.confirmButton}
          disabled={!selectedDoctor || !selectedDate || !selectedTime}
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
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  doctorsList: {
    marginBottom: spacing.md,
  },
  doctorCard: {
    width: 150,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  doctorCardSelected: {
    borderColor: colors.primary,
    backgroundColor: withOpacity(colors.primary, 0.06),
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  doctorName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  doctorSpecialty: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  rating: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  dateButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateText: {
    ...typography.body,
    color: colors.text,
  },
  dateTextSelected: {
    color: colors.textLight,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  timeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: '30%',
  },
  timeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeText: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
  },
  timeTextSelected: {
    color: colors.textLight,
  },
  reasonInput: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.surfaceLight,
    color: colors.text,
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: spacing.xl,
  },
  confirmButton: {
    marginBottom: spacing.xl,
  },
});


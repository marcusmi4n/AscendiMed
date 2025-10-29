import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

export default function ImportMediaScreen({ navigation }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImages([...selectedImages, ...result.assets]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImages([...selectedImages, result.assets[0]]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Import Media</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
            <Ionicons name="image" size={32} color={colors.primary} />
            <Text style={styles.actionButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
            <Ionicons name="camera" size={32} color={colors.primary} />
            <Text style={styles.actionButtonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        {selectedImages.length > 0 && (
          <View style={styles.imagesContainer}>
            <Text style={styles.sectionTitle}>Selected Images ({selectedImages.length})</Text>
            <View style={styles.imageGrid}>
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: image.uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={24} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {selectedImages.length > 0 && (
          <Button
            title="Upload Images"
            onPress={() => alert('Images uploaded!')}
            variant="primary"
            style={styles.uploadButton}
          />
        )}
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
  buttonContainer: {
    marginBottom: spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  actionButtonText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.md,
    fontWeight: '600',
  },
  imagesContainer: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: '48%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  uploadButton: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});


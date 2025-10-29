import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ChatWithDriverScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'I\'m on my way. ETA 5 minutes.', isUser: false, time: '2:45 PM' },
    { id: '2', text: 'Thank you!', isUser: true, time: '2:46 PM' },
  ]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.driverMessage,
      ]}
    >
      <Text style={[styles.messageText, item.isUser && styles.userMessageText]}>
        {item.text}
      </Text>
      <Text style={[styles.messageTime, item.isUser && styles.userMessageTime]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.driverIndicator} />
          <View>
            <Text style={styles.headerTitle}>Ambulance Driver</Text>
            <Text style={styles.headerSubtitle}>Available</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="call" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color={colors.textSecondary} />
          <Text style={styles.mapText}>Live Location Tracking</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        style={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() ? colors.textLight : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    marginRight: spacing.sm,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  mapContainer: {
    height: 200,
    backgroundColor: colors.surface,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    padding: spacing.md,
  },
  messageContainer: {
    maxWidth: '75%',
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  driverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...typography.body,
    color: colors.text,
  },
  userMessageText: {
    color: colors.textLight,
  },
  messageTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontSize: 10,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    ...typography.body,
    backgroundColor: colors.surfaceLight,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    color: colors.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: colors.surface,
  },
});


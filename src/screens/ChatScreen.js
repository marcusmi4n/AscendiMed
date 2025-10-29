import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const MOCK_MESSAGES = [
  { id: '1', text: 'Hello, how can I help you today?', isUser: false, time: '10:30 AM' },
  { id: '2', text: 'I have a question about my prescription', isUser: true, time: '10:31 AM' },
  { id: '3', text: 'Sure, I can help with that. What medication are you taking?', isUser: false, time: '10:32 AM' },
];

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');

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
        item.isUser ? styles.userMessage : styles.otherMessage,
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
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Dr. Sarah Johnson</Text>
            <Text style={styles.headerSubtitle}>Online</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
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
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.success,
    marginTop: 2,
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
  otherMessage: {
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
  attachButton: {
    marginRight: spacing.sm,
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


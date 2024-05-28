import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import themeContext from "../themes/themeContext"; 

export default function ChatScreen() {
  const theme = useContext(themeContext); 

  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState(''); 

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'me' }]);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Mensajes */}
      <View style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={[styles.messageBubble, { alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start' }]}>
            <Text style={[styles.messageText, { color: theme.color }]}>{message.text}</Text>
          </View>
        ))}
      </View>

      {/* Entrada de mensaje */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: theme.color }]}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          placeholder="Type your message..."
          placeholderTextColor={theme.placeholderColor}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0', 
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff', 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
});

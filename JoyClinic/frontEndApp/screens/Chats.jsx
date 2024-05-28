import React, { useState, useContext, useCallback, useEffect, useRef   } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import themeContext from "../themes/themeContext"; 
import { GiftedChat } from 'react-native-gifted-chat'
import uuid from 'react-native-uuid'; 

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null); // Referencia para FlatList

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        // text: 'Hello developer',
        // createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: 1,
      }}
      messageContainerRef={{
        backgroundColor: '#fff'
      }}
      renderChatFooter={() => (
        <View style={styles.footer}></View>
      )}
      ref={ref => { flatListRef.current = ref; }}
      listViewProps={{
        ref: flatListRef
      }}
    />
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

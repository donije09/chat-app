import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome to the chat!',
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 2,
        text: 'Hello, how can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Support',
        },
      },
    ]);
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />
      ) : null}
    </View>
  );
};

export default Chat;

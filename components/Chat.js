import React, { useState, useEffect } from 'react';
import { View, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../App'; // Import Firestore instance

const Chat = ({ route }) => {
  const { _id, name, bgColor, isConnected } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (isConnected) {
      // Fetch messages from Firestore in real time
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesFirestore = snapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: new Date(firebaseData.createdAt.seconds * 1000),
            user: firebaseData.user
          };

          return data;
        });
        setMessages(messagesFirestore);
        cacheMessages(messagesFirestore); // Cache messages
      });
    } else {
      loadCachedMessages(); // Load cached messages when offline
      showConnectionLostAlert(); // Show connection lost alert
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isConnected]);

  // Cache messages in AsyncStorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.error('Failed to cache messages', error);
    }
  };

  // Load cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem('messages');
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.error('Failed to load cached messages', error);
    }
  };

  // Show an alert when connection is lost
  const showConnectionLostAlert = () => {
    Alert.alert('Connection Lost', 'You are now offline. You cannot send messages.');
  };

  // Disable the input toolbar when offline
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    }
    return null;
  };

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: _id,
          name: name
        }}
        renderInputToolbar={renderInputToolbar} // Disable toolbar when offline
      />
      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />
      ) : null}
    </View>
  );
};

export default Chat;

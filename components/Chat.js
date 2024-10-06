// components/Chat.js
import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../App'; // Import Firestore instance from App.js

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { _id, name, bgColor } = route.params; // Get user details and background color

  // Function to map Firestore message data
  const mapFirestoreData = (doc) => {
    const firebaseData = doc.data();
    return {
      _id: doc.id,
      text: firebaseData.text || '',
      createdAt: new Date(firebaseData.createdAt.seconds * 1000),
      user: firebaseData.user,
      image: firebaseData.image || null,
      location: firebaseData.location || null,
    };
  };

  // Effect for syncing messages based on connection status
  useEffect(() => {
    // Fetch messages from Firestore in real-time
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesFirestore = snapshot.docs.map(doc => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: firebaseData.text,
          createdAt: new Date(firebaseData.createdAt.seconds * 1000), // Convert Firestore timestamp to JS Date
          user: firebaseData.user
        };

        return data;
      });
      setMessages(messagesFirestore);
    });

<<<<<<< HEAD
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
    return isConnected ? <InputToolbar {...props} /> : null;
  };
=======
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
>>>>>>> parent of 35497f6 (offline mode added)

  // Handle sending messages
  const onSend = (newMessages = []) => {
    const message = newMessages[0];
    addDoc(collection(db, 'messages'), {
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: _id, // User's ID
        name: name // User's name
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: _id, // User ID
          name: name // User name
        }}
      />
      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />
      ) : null}
    </View>
  );
};

export default Chat;

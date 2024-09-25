import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Start from './components/Start';
import Chat from './components/Chat';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0LNZNB7AR734oGNM7-uF-c_N8JTBx6S8",
  authDomain: "chatapp-7d513.firebaseapp.com",
  projectId: "chatapp-7d513",
  storageBucket: "chatapp-7d513.appspot.com",
  messagingSenderId: "537286917398",
  appId: "1:537286917398:web:8622e31f6b0408abe1a437"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Firebase Auth
const db = getFirestore(app);
const auth = getAuth(app);

const Stack = createStackNavigator();

const App = () => {
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isConnected === false) {
      disableNetwork(db); // Disable Firestore when offline
    } else if (netInfo.isConnected === true) {
      enableNetwork(db); // Enable Firestore when online
    }
  }, [netInfo.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({ title: route.params.name })}
          initialParams={{ isConnected: netInfo.isConnected }} // Pass connection status to Chat.js
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { db, auth };
export default App;

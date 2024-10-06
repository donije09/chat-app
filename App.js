// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0LNZNB7AR734oGNM7-uF-c_N8JTBx6S8",
  authDomain: "chatapp-7d513.firebaseapp.com",
  projectId: "chatapp-7d513",
  storageBucket: "chatapp-7d513.appspot.com",
  messagingSenderId: "537286917398",
  appId: "1:537286917398:web:8622e31f6b0408abe1a437"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Firebase Auth

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({ title: route.params.name })} // Display user's name as chat title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { db, auth };
export default App;

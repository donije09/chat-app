import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { v4 as uuidv4 } from 'uuid';

const CustomActions = ({ wrapperStyle, iconTextStyle, storage, onSend, userID, name }) => {
  const actionSheet = useActionSheet();

  const generateReference = (uri) => {
    const name = uri.split('/').pop(); // Extract the file name from the URI
    return `${userID}-${Date.now()}-${name}`;
  };

  const onActionPress = () => {
    Keyboard.dismiss();
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions({ options, cancelButtonIndex }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          pickImage();
          return;
        case 1:
          takePhoto();
          return;
        case 2:
          getLocation();
          return;
        default:
          return;
      }
    });
  };

  const uploadAndSendImage = async (imageURI) => {
    try {
      if (!imageURI) {
        throw new Error('Image URI is invalid');
      }
      
      console.log('Uploading image:', imageURI); // Log the image URI
  
      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);
      
      // Fetch the image as a blob
      const response = await fetch(imageURI);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      // Upload the blob to Firebase
      await uploadBytes(newUploadRef, blob);
      const imageURL = await getDownloadURL(newUploadRef);
      
      const imageMessage = {
        _id: uuidv4(),
        text: '',
        createdAt: new Date(),
        user: { _id: userID, name: name },
        image: imageURL,
      };
      
      onSend([imageMessage]);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload and send the image.');
      console.error('Image upload error:', error);
    }
  };
  

  const pickImage = async () => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Permission to access media library is required.');
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        // Log the image URI to verify
        console.log('Selected Image URI:', result.assets[0].uri);
        await uploadAndSendImage(result.assets[0].uri);  // Pass URI to upload function
      } else {
        console.log('Image selection canceled.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  

  const takePhoto = async () => {
    try {
      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Permission to access camera is required.');
        return;
      }
  
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        // Log the image URI to verify
        console.log('Captured Image URI:', result.assets[0].uri);
        await uploadAndSendImage(result.assets[0].uri);  // Pass URI to upload function
      } else {
        console.log('Camera operation canceled.');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };
  

  const getLocation = async () => {
    try {
      let permissionResult = await Location.requestForegroundPermissionsAsync();
      if (permissionResult.granted) {
        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          const locationMessage = {
            _id: uuidv4(),
            text: '',
            createdAt: new Date(),
            user: { _id: userID, name: name },
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          };
          onSend([locationMessage]);
        } else {
          Alert.alert('Error', 'Location data is not available.');
        }
      } else {
        Alert.alert('Permission Denied', 'Location access denied.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Error', 'An error occurred while fetching location.');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#B1B2FF',
    borderWidth: 4,
    flex: 1,
  },
  iconText: {
    color: '#B1B2FF',
    fontWeight: '900',
    fontSize: 20,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: -5,
  },
});

export default CustomActions;

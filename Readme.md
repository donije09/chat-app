
# Chat App

A simple real-time chat application built using **React Native** and **Expo**. The app allows users to set their display name, customize the chat background color, and send messages in real-time. Navigation between the Start Screen and Chat Screen is handled seamlessly using **React Navigation**.

## Features

- **Display Name:** Users can set their display name on the Start Screen.
- **Background Customization:** Users can select a background color for the chat room.
- **Smooth Navigation:** Navigate between the Start Screen and Chat Screen.
- **Real-Time Messaging:** Send and receive messages in real-time with a personalized chat interface.
- **Responsive Design:** The UI adapts to different screen sizes and orientations.

## Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

Optional (if you plan to run the project on an emulator):

- [Android Studio](https://developer.android.com/studio) for Android emulation.
- [Xcode](https://developer.apple.com/xcode/) for iOS emulation (Mac only).

### Installation

1. **Clone the repository:**

   git clone https://github.com/donije09/chat-app.git

2. **Navigate to the project directory:**

   cd chat-app

3. **Install the project dependencies:**

   
   npm install
  

4. **Start the Expo development server:**

   
   npx expo start

5. **Run the app:**

   - You can run the app on your local emulator or Expo Go on your physical device by scanning the QR code that appears in the terminal after starting Expo.

### Setting Up the Development Environment

- **Expo:** The app is powered by **Expo** for development and deployment. If you're new to Expo, follow the setup guide [here](https://docs.expo.dev/get-started/installation/).
- **Emulators:** If you're testing the app on an emulator, ensure **Android Studio** (for Android) or **Xcode** (for iOS) is installed and properly configured.

### Database Configuration

If you plan to integrate a real database:

1. Choose a database (e.g., Firebase, MongoDB).
2. Add the configuration details in your project code (e.g., Firebase credentials).
3. Update the README to reflect the database setup process.

### Libraries to Install

The following libraries are necessary for the project. They will be installed automatically when you run \`npm install\`, but here's a breakdown:

- **React Navigation:** For screen navigation. Installed via \`npm install @react-navigation/native\`.
- **Gifted Chat:** Provides the chat UI. Installed via \`npm install react-native-gifted-chat\`.
- **Expo:** Powers the project and provides utilities such as camera access and push notifications.
  
If you need to install any of these manually, you can run the following commands:


npm install @react-navigation/native
npm install react-native-gifted-chat

### Testing the Setup

To ensure your setup instructions are correct, follow these steps:

1. **Clone the repo** into a new folder on your computer.
2. **Follow the setup steps** outlined in this README.
3. **Start the project** and verify everything works as expected.

If you encounter issues during this process, update the README to include any missing steps or necessary clarifications.

### Folder Structure

A quick overview of the key files and directories:

- **App.js:** The main entry point of the app, handling navigation.
- **components/:** Contains reusable components, such as the Start Screen and Chat Screen.
- **assets/:** Contains images and other static assets.
- **package.json:** Lists dependencies and scripts.

### Contributing

Feel free to submit pull requests or report any issues. Contributions are welcome!

### License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/donije09/chat-app/blob/main/LICENSE) file for details.

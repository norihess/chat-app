import React, { Component } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

// import the screens
import Home from './components/Home';
import Chat from './components/Chat';

// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends React.Component{

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Chat App"
            component={Home}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// style sheet at the bottom
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


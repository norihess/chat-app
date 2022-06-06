import React, {Component} from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView} from 'react-native';
// import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
      image: null,
      location: null,
    };
  }
  
  componentDidMount() {
    // get username prop from Start.js
    const name = this.props.route.params.name;
    // if (name === '') name = 'UNNAMED'
    this.props.navigation.setOptions({ title: name});
  } 



//render components
render() {
   //background color chosen in Start screen is set as const bgColor
   const { bgColor } = this.props.route.params;

  return (
    <View style={styles.chatView}>
  </View>
    );
  }
}


const styles = StyleSheet.create({
  chatView: {
    flex: 1,
  },
})
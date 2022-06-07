import React, {Component} from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }
  
  componentDidMount() {
    // get username prop from Start.js
    const name = this.props.route.params.name;
    // if (name === '') name = 'UNNAMED'
    this.props.navigation.setOptions({ title: name});

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    }) 
  } 

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }



//render components
render() {
   //background color chosen in Start screen is set as const bgColor
   const { bgColor } = this.props.route.params;

  return (
    <View style={styles.chatView}>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        />
  </View>
    );
  }
}


const styles = StyleSheet.create({
  chatView: {
    flex: 1,
    backgroundColor: bgColor
  },
})
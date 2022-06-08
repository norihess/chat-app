import React, {Component} from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

//// firebase adding credential in order to connect to firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGNLywIhnK9I7azadzroOcj3-e4qFQ-Y0",
  authDomain: "chat-app-2574c.firebaseapp.com",
  projectId: "chat-app-2574c",
  storageBucket: "chat-app-2574c.appspot.com",
  messagingSenderId: "973802150065",
};

export default class Chat extends React.Component {
  constructor(){
    super();
    this.state ={
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
        image: null,
        location: null,
      },
    }

    // initializes the Firestore app
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    //Stores and retrieves the chat messages users send
    this.referenceChatMessages = firebase.firestore().collection("messages");

    this.referenceMessagesUser= null;
  }

  componentDidMount() {
     // get username prop from Start.js
   const name = this.props.route.params.name;
   // if (name === '') name = 'UNNAMED'
   this.props.navigation.setOptions({ title: name});
     // Reference to load messages via Firebase
    this.referenceChatMessages = firebase.firestore().collection("messages");
    
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JlYXRpdmUlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
          },
         },
         {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  }

// firebase storage
async saveMessages() {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}

async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}

// stop listening to auth and collection changes
componentWillUnmount() {
  this.authUnsubscribe();
  
}

 // Adds messages to cloud storage
 addMessages() {
  const message = this.state.messages[0];
  this.referenceChatMessages.add({
    uid: this.state.uid,
    _id: message._id,
    text: message.text || "",
    createdAt: message.createdAt,
    user: message.user,
    image: message.image || null,
    location: message.location || null,
  });
}

onSend(messages = []) {
  this.setState((previousState) => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),() => {
    this.addMessages();
    this.saveMessages();
  });
}


onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    var data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: {
        _id: data.user._id,
        name: data.user.name,
        avatar: data.user.avatar
      },
      image: data.image || null,
      location: data.location || null,
    });
  });
  this.setState({
    messages: messages,
  });
};

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }


//render components
render() {
   //background color chosen in Start screen is set as const bgColor
   const { bgColor } = this.props.route.params;

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
    );
  }
}


const styles = StyleSheet.create({
  
})
import React, {Component} from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView, Button} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';
import firebase from 'firebase';
import 'firebase/firestore';

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
      messages: [
        // {
        //   _id: 1,
        //   text: 'Hello developer',
        //   createdAt: new Date(),
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JlYXRpdmUlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        //   },
        //  },
        //  {
        //   _id: 2,
        //   text: 'This is a system message',
        //   createdAt: new Date(),
        //   system: true,
        //  },
      ],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
        image: null,
        location: null,
      },
      isConnected: false,
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
   this.getMessages();

   NetInfo.fetch().then((connection) => {
    if (connection.isConnected) {
      this.setState({ isConnected: true });
      console.log('online');

      this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
        if (!user) {
          await firebase.auth().signInAnonymously();
        }

        //update user state with currently active user data
        this.setState({
          uid: user.uid,
          loggedInText: 'Hello there, please wait',
          messages: [],
          user: {
            _id: user.state.uid,
            username: username,
            avatar: "https://placeimg.com/140/140/any"
          },
        });
        // create a reference to the active user's documents (messages)
        this.referenceMessagesUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);
        this.saveMessages();
        // listens for updates in the collection

       // listen for collection changes for current user
       this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
        // this.saveMessages();
      });

    } else {
      this.setState({ isConnected: false });
      console.log('offline');
      this.getMessages();
    }

    })
  };

// firebase storage
async saveMessages() {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}

// async getMessages() {
//   try {
//     msgs = await AsyncStorage.getItem('messages');
//     console.log(msgs)
//     this.setState({
//       messages: this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)
//     })
//   } catch (error) {
//     console.log(error.message);
//   }
// }
async getMessages() {
  try {
    let messages = await AsyncStorage.getItem('messages') || [];

    this.setState({
      messages: JSON.parse(messages),
    });
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
  // stop listening to authentication
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
          backgroundColor: '#0005'
        }
      }}
    />
  )
}

// creating the circle button
renderCustomActions = (props) => {
  return <CustomActions {...props} />;
};

renderInputToolbar(props) {
  if (this.state.isConnected == false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
}

renderCustomView(props) {
  const { currentMessage } = props;
  if (currentMessage.location) {
    return (
      <MapView
        style={{
          width: 150,
          height: 100,
          borderRadius: 13,
          margin: 3
        }}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
  return null;
}



//render components
render() {
   //background color chosen in Start screen is set as const bgColor
   const { bgColor } = this.props.route.params;

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <Text>{this.state.loggedInText}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
            username: this.state.username,
            avatar: this.state.user.avatar
          }}
        />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
    );
  }
}


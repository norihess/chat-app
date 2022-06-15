import React from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { useState, useEffect, useCallback } from "react";
//using db reference and auth
import { db } from "../firebase-config/firebase-config";
//import of asyncstorage
import AsyncStorage from "@react-native-async-storage/async-storage";
//import of netinfo
import NetInfo from "@react-native-community/netinfo";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import MapView from "react-native-maps";
//import custom actions component
import CustomActions from "./CustomActions";

export default function Chat(props) {
  //retrieving props
  let { name, bg, userId } = props.route.params;

  //reference to the database
  const myReference = collection(db, "messages");

  //state management
  const [messages, setMessages] = useState([]);
  //connection state
  const [isOnline, setIsOnline] = useState();

  //save new messages locally via asyncstorage
  //setItem() is used both to add new data item (when no data for given key exists), and to modify existing item (when previous data for given key exists).
  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
      console.log("message saved in asyncstorage");
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  //getMessages function to asynchronously retrieve messages from asyncstorage
  //reading data
  //getItem returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
  const getMessages = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      setMessages(JSON.parse(messages));
      //error when setting the messages state
      //  setMessages(JSON.parse(jsonValue));
      console.log(JSON.parse(messages));
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  //async function to delete messages stored in asyncstorage
  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    // Set the screen title to the user name entered in the start screen
    props.navigation.setOptions({ title: name });

    // Check if user is offline or online using NetInfo
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        setIsOnline(true);
        // Create a query to the messages collection, retrieving all messages sorted by their date of creation
        const messagesQuery = query(myReference, orderBy("createdAt", "desc"));
        // onSnapshot returns an unsubscriber, listening for updates to the messages collection
        //if user is logged in and their collection is empty (default, users are anonymous and can't log back in)
        const unsubscribeList = onSnapshot(messagesQuery, onCollectionUpdate);
        // Save messages to asyncStorage

        //unsubscribe to snapshot updates
        return () => {
          isMounted = false;
          unsubscribeList();
        };
      } else {
        setIsOnline(false);
        return () => {
          // Delete previously saved messages in asyncStorage
          deleteMessages();
        };
      }
    });
  }, []);

  useEffect(() => {
    if (isOnline) {
      saveMessages();
    } else {
      getMessages();
    }
  }, [messages]);

  const onCollectionUpdate = (snap) => {
    //setting the list
    setMessages(
      snap.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
        //adding image and location data
        image: doc.data().image,
        location: doc.data().location,
      }))
    );
  };

  //currently unused because new messages should be saved into asyncstorage
  const addMessage = (message) => {
    addDoc(myReference, {
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
      //adding image and location data
      image: message.image || null,
      location: message.location || null,
    })
      .then(() => {
        console.log("Doc created");
      })
      .catch((e) => console.log(e.message));
  };

  // Create custom onSend function, appending the newly created message to the messages state,
  // then calling addMessage to add to Firestore
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    //saving new message in db
    addMessage(messages[0]);
  }, []);

  //this will allow to change the message bubble color
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
        textProps={{
          style: {
            color: props.position === "left" ? "#000" : "#fff",
          },
        }}
      />
    );
  };

  //gifted chat feature - do not show the input box when the user is offline (so that they can't try to send messages offline)
  const renderInputToolbar = (props) => {
    if (!isOnline) {
      //hide toolbar
    } else {
      //display input box / toolbar
      return <InputToolbar {...props} />;
    }
  };

  //function to render custom actions (pictures, camera, geolocation)
  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  //create a function that lets you render a MapView if the message object contains location data
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
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
  };

  console.log(messages);
  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <GiftedChat
        renderBubble={renderBubble.bind()}
        renderActions={renderCustomActions}
        renderInputToolbar={renderInputToolbar.bind()}
        renderCustomView={renderCustomView}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        showAvatarForEveryMessage={true}
        user={{
          _id: userId,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        }}
      />
      {/**to fix keyboard issue on old models of android */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}

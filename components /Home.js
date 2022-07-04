import React, {useState} from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Pressable} from 'react-native'; 
import BackgroundImage from '../img/BackgroundImage.png';


// Create constant that holds background colors for Chat Screen
const colors = {
  red: "#B80C09",
  sapphire: "#0B4F6C",
  cyan: "#01BAEF",
  purple: "#370031",
  white: "#FFFFFF"
};

  export default function Home(props) {
    let [name, setName] = useState();
    let [color, setColor] = useState();
  
  
    return (
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage} resizeMode='cover' style={styles.backgroundImg}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Chat App</Text>
          </View>
          {/* Input box to set user name passed to chat screen */}
          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <TextInput
                onChangeText={(name) => setName(name)}
                value={name}
                style={styles.input}
                placeholder='Your name...'
              />
              </View>

          {/* Allow user to choose a background color for the chat screen */}
          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[{ backgroundColor: colors.red }, styles.colorbutton]}
              onPress={() => setColor(colors.red)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.sapphire }, styles.colorbutton]}
              onPress={() => setColor(colors.sapphire)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.cyan }, styles.colorbutton]}
              onPress={() => setColor(colors.cyan)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.purple }, styles.colorbutton]}
              onPress={() => setColor(colors.purple)}
            />
          </View>

          {/* Open chatroom, passing user name and background color as props */}
          <Pressable
            onPress={() => props.navigation.navigate('Chat', { name: name, color: color })}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? '#585563'
                  : '#757083'
              },
              styles.button
            ]}
          >
            <Text style={styles.buttontext}>Start Chatting</Text>
          </Pressable>
          </View>
        </ImageBackground>
      </View>
      
    )
   }

   const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    backgroundImg: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    },

    titleBox: {
      height: '38%',
      width: '80%',
      alignItems: 'center',
      paddingTop: 40,
    },

    title: {
      fontSize: 45,
      fontWeight: '600',
      color: '#ffffff',
    },

    box1: {
    backgroundColor: 'white', 
    height: '45%',
    width: '85%',
    justifyContent: 'space-around', 
    alignItems: 'center',
    },

    image: {
      width: 25,
      height: 25,
      marginRight: 20,
    },

    inputBox: {
      borderWidth: 2,
      borderRadius: 1,
      borderColor: 'grey',
      width: '90%',
      height: 60,
      paddingLeft: 20,
      flexDirection: 'row',
      alignItems: 'center'
    },

    input: {
     flex: 1,
    fontSize: 18, 
    fontWeight: "400", 
    color: '#757083', 
    opacity: 50
    },
  
    text: {
    fontSize: 14, 
    fontWeight: "500", 
    color: '#757083'
    },
  
    colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingRight: 5,
    alignItems: 'center'
    },
  
    colorbutton: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
  
    button: {
      width: '88%',
      height: 70,
      backgroundColor: "#051923",
      alignItems: 'center',
      justifyContent: 'center',
      width: 310,
      height: 60,
      borderRadius: 30
    },
  
    buttontext: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: "400"
    }
  });

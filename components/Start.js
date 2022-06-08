import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from 'react-native';

import BackgroundImage from '../assets/background-image.png';

export default class Start extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: this.colors.pink,
    };
  }
	  // function to update the state with the new background color for Chat Screen chosen by the user
		changeBgColor = (newColor) => {
			this.setState({ bgColor: newColor });
		};
		
		// backgroud colors to choose
		colors = {
			turq: "#114B5F",
			wheat: "#ECE2D2",
			maroon: "#6B2737",
			pink: "#F45B69",
			blueGrey: "#7C9EB2",
		};
	
		render() {
			return (
				// Components to create the color arrays, titles and the app's colors
				<View style={styles.container}>
					<ImageBackground
						source={BackgroundImage}
						resizeMode="cover"
						style={styles.backgroundImage}
					>
						<View style={styles.titleBox}>
							<Text style={styles.title}>Chat App</Text>
						</View>
	
						<View style={styles.box1}>
							<View style={styles.inputBox}>
								<TextInput
									style={styles.input}
									onChangeText={(text) => this.setState({ name: text })}
									value={this.state.name}
									placeholder="What is your name?"
								/>
							</View>
	
							<View style={styles.colorBox}>
								<Text style={styles.chooseColor}>
									{" "}
									Pick a background color!{" "}
								</Text>
							</View>
	
							{/* All the colors to change the background are here! */}
							<View style={styles.colorArray}>
								<TouchableOpacity
									style={styles.color1}
									onPress={() => this.changeBgColor(this.colors.turq)}
								></TouchableOpacity>
								<TouchableOpacity
									style={styles.color2}
									onPress={() => this.changeBgColor(this.colors.blueGrey)}
								></TouchableOpacity>
								<TouchableOpacity
									style={styles.color3}
									onPress={() => this.changeBgColor(this.colors.maroon)}
								></TouchableOpacity>
								<TouchableOpacity
									style={styles.color4}
									onPress={() => this.changeBgColor(this.colors.pink)}
								></TouchableOpacity>
							</View>
	
							{/*This will allow the user to click on a button and be redirected to the chat page */}
							<Pressable
								style={styles.button}
								onPress={() =>
									this.props.navigation.navigate("Chat", {
										name: this.state.name,
										bgColor: this.state.bgColor,
									})
								}
							>
								<Text style={styles.buttonText}>Start Chatting</Text>
							</Pressable>
						</View>
					</ImageBackground>
				</View>
			);
		}
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
		},
	
		backgroundImage: {
			flex: 1,
			width: "100%",
			alignItems: "center",
			justifyContent: "center",
		},
	
		titleBox: {
			height: "40%",
			width: "88%",
			alignItems: "center",
			paddingTop: 100,
		},
	
		title: {
			fontSize: 45,
			fontWeight: "600",
			color: "#FFFFFF",
		},
	
		box1: {
			backgroundColor: "#FFFFFF",
			height: "46%",
			width: "88%",
			justifyContent: "space-around",
			alignItems: "center",
		},
	
		inputBox: {
			borderWidth: 2,
			borderRadius: 1,
			borderColor: "grey",
			width: "88%",
			height: 60,
			paddingLeft: 20,
			flexDirection: "row",
			alignItems: "center",
		},
	
		image: {
			width: 20,
			height: 20,
			marginRight: 10,
		},
	
		input: {
			fontSize: 16,
			fontWeight: "300",
			color: "#757083",
			opacity: 0.5,
		},
	
		colorBox: {
			marginRight: "auto",
			paddingLeft: 15,
			width: "88%",
		},
	
		chooseColor: {
			fontSize: 16,
			fontWeight: "300",
			color: "#757083",
			opacity: 100,
		},
	
		colorArray: {
			flexDirection: "row",
			justifyContent: "space-between",
			width: "80%",
		},
	
		color1: {
			backgroundColor: "#114B5F",
			width: 50,
			height: 50,
			borderRadius: 25,
		},
	
		color2: {
			backgroundColor: "#7C9EB2",
			width: 50,
			height: 50,
			borderRadius: 25,
		},
	
		color3: {
			backgroundColor: "#6B2737",
			width: 50,
			height: 50,
			borderRadius: 25,
		},
	
		color4: {
			backgroundColor: "#F45B69",
			width: 50,
			height: 50,
			borderRadius: 25,
		},
	
		button: {
			width: "88%",
			height: 70,
			borderRadius: 8,
			backgroundColor: "#114B5F",
			alignItems: "center",
			justifyContent: "center",
		},
	
		buttonText: {
			color: "#FFFFFF",
			fontSize: 16,
			fontWeight: "600",
		},
	});
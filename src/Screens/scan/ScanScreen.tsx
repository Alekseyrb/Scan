import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
// import { Camera, useCameraDevice } from "react-native-vision-camera";



interface Props {
  navigation: any;
}

const ScanScreen: React.FC<Props> = ({ navigation }) => {
  // const device = useCameraDevice('back')
  //
  // if (device == null) return <Text />
  // return (
  //   <Camera
  //     style={StyleSheet.absoluteFill}
  //     device={device}
  //     isActive={true}
  //   />
  // )
  return <Text>AA</Text>

};


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});

export default ScanScreen;

import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native";
import Logo from "../assets/Logo";

interface Props {
  navigation: any;
}

const StartScreen: React.FC<Props> = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate("SingIn");
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  return (
    // <ImageBackground source={require("../assets/BGPattern.png")} style={styles.background}>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.text}>We verify the authenticity of documents</Text>
        <TouchableOpacity style={styles.btnLogin} onPress={handleLoginPress}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnReg} onPress={handleRegisterPress}>
          <Text style={styles.btnText}>Registration</Text>
        </TouchableOpacity>
      </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000',
    paddingHorizontal: 16
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 32,
    paddingHorizontal: 25,
    textAlign: "center",
    paddingTop: 25
  },
  btnLogin: {
    backgroundColor: "#7920C8",
    width: '100%',
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#7920C8",
    marginTop: 32,
    marginBottom: 16
  },
  btnReg: {
    backgroundColor: "transparent",
    width: '100%',
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#7920C8"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});


export default StartScreen;

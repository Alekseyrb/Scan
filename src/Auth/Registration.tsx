import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import ArrowLeft from "../assets/ArrowLeft";
import axios from "axios";

interface Props {
  navigation: any;
}

const Registration: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const login = async () => {
    try {
      axios.post('https://dashboard-s2v.vrpro.com.ua/api/register/new', {
        email: email,
        name: fullName,
      })
        .then(({ data }) => {
          console.log("Success:", data);
          navigation.navigate("VerifyEmail", data);
        })
    } catch (e) {
      console.error('Error: 777777', e)
    }
    // navigation.navigate("VerifyEmail", {
    //   data: {email: "hifaho8351@comsb.com", "id": 13, "name": "As aaaaaa", register_code: 399652, "role": "user", "updated_at": "2024-02-29T19:52:37.000000Z"}
    // });
    // navigation.navigate("VerifyEmail");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnGoBack} onPress={goBack}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.text}>Registration</Text>
      <Text style={styles.inputLabelText}>Full name</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        placeholderTextColor="#595674"
        value={fullName}
        onChangeText={setFullName}
      />
      <Text style={styles.inputLabelText}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#595674"
        value={email}
        onChangeText={setEmail}
      />


      <TouchableOpacity style={styles.btnLogin} onPress={login}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },
  text: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "400",
    lineHeight: 42,
    paddingTop: 106
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
    marginTop: 24,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  btnGoBack: {
    paddingTop: 60,
  },
  input: {
    backgroundColor: '#2A2840',
    width: '100%',
    height: 56,
    marginRight: 16,
    borderRadius: 14,
    marginTop: 5,
    padding: 16
  },
  inputLabelText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    paddingTop: 24,
  },
  textForgot: {
    color: '#A64DF4',
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 38,
  }
});


export default Registration;

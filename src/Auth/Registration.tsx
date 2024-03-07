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
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const validateEmail = (email: any) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    if (fullName.trim().length === 0) {
      setFullNameError('Full name is required.');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const register = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('https://dashboard-s2v.vrpro.com.ua/api/register/new', {
        name: fullName,
        email: email,
      });
      console.log("Success:", response.data);
      navigation.navigate("VerifyEmail", response.data);
    } catch (e) {
      console.error('Error:', e);
      // Здесь можно добавить обработку ошибок сервера, если нужно
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnGoBack} onPress={goBack}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.text}>Registration</Text>
      <Text style={styles.inputLabelText}>Full name</Text>
      <TextInput
        style={[styles.input, fullNameError ? { borderColor: 'red', borderWidth: 1 } : {}]}
        placeholder="Full Name"
        placeholderTextColor="#595674"
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
          setFullNameError('');
        }}
      />
      {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}
      <Text style={styles.inputLabelText}>Email</Text>
      <TextInput
        style={[styles.input, emailError ? { borderColor: 'red', borderWidth: 1 } : {}]}
        placeholder="Email"
        placeholderTextColor="#595674"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TouchableOpacity style={styles.btnLogin} onPress={register}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151422",
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
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
    color: '#fff',
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

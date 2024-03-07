import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import ArrowLeft from "../assets/ArrowLeft";
import axios from "axios";
import { useAuth } from "../store/AuthContext";

interface Props {
  navigation: any;
}

const SignIn: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('kotejov268@aersm.com');
  const [password, setPassword] = useState('aaaaaaaaa');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  // @ts-ignore
  const { setLoginToken } = useAuth();

  const goBack = () => {
    navigation.goBack();
  };
  const resetPassword = () => {
    navigation.navigate('ChangePassword');
  }

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    setServerError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const login = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('https://dashboard-s2v.vrpro.com.ua/api/login', {
        email: email,
        password: password,
      }).then(({ data }) => {
          console.log("Success:", data);
          setLoginToken(data.access_token);
          // AsyncStorage.setItem('token', data.access_token);
          navigation.navigate("MainTabs");
        }).catch((error) => {
          // Handling errors like 401, 403, 500, etc.
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error?.response?.data);
            const message = 'An error occurred. Please try again.';
            setServerError(message);
          } else if (error.request) {
            // The request was made but no response was received
            setServerError('The request was made but no response was received');
          } else {
            // Something happened in setting up the request that triggered an Error
            setServerError('Error: ' + error.message);
          }
        });
    } catch (e) {
      console.error('Login Error:', e);
      setServerError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnGoBack} onPress={goBack}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.text}>Sign In</Text>
      <Text style={styles.inputLabelText}>Email</Text>
      <TextInput
        style={[styles.input, emailError ? { borderColor: 'red', borderWidth: 1 } : {}]}
        placeholder="simpleemail@simple.domain"
        placeholderTextColor="#595674"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <Text style={styles.inputLabelText}>Password</Text>
      <TextInput
        style={[styles.input, passwordError ? { borderColor: 'red', borderWidth: 1 } : {}]}
        placeholder="Password"
        placeholderTextColor="#595674"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError('');
        }}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.btnLogin} onPress={login}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      {serverError ? <Text style={styles.serverErrorText}>{serverError}</Text> : null}
      <TouchableOpacity onPress={resetPassword}>
      <Text style={styles.textForgot}>Forgot password?</Text>
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
  text: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "400",
    lineHeight: 42,
    paddingTop: 36
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
    padding: 16,
    color: '#fff',
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
  },
  errorText: {
    color: 'red', // Customize error text color as needed
    fontSize: 14,
    marginTop: 5,
  },
  inputError: {
    borderColor: 'red', // Customize border color for error input as needed
  },
  serverErrorText: {
    color: 'red', // Customize server error text color as needed
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});


export default SignIn;

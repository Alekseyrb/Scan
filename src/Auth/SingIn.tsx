import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import ArrowLeft from "../assets/ArrowLeft";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: any;
}

const SingIn: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // @ts-ignore
  const { setLoginToken } = useAuth();
  const goBack = () => {
    navigation.goBack();
  };

  const login = async () => {
    try {
      axios.post('https://dashboard-s2v.vrpro.com.ua/api/login', {
        email: 'kotejov268@aersm.com',
        password: 'aaaaaaaaa',
      })
        .then(({ data }) => {
            console.log("Success:", data);
            setLoginToken(data.access_token)
            // AsyncStorage.setItem('token', data.access_token);
            navigation.navigate("MainTabs");
          }
        )
    } catch (e) {
      console.error('Error: 777777', e)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnGoBack} onPress={goBack}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.text}>Sing In</Text>
      <Text style={styles.inputLabelText}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="simpleemail@simple.domain"
        placeholderTextColor="#595674"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.inputLabelText}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Это скрывает введенный текст (для пароля)
      />
      <TouchableOpacity style={styles.btnLogin} onPress={login}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.textForgot}>Forgot password?</Text>
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


export default SingIn;

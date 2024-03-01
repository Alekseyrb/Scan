import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import ArrowLeft from "../assets/ArrowLeft";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

interface Props {
  navigation: any;
}

const VerifyEmail: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  // @ts-ignore
  const {data} = route.params;
  const [codeVer, setVerCode] = useState(data.register_code);
  const [password, setPassword] = useState('');
  useEffect(() => {
    console.log(data);
    setVerCode(data.register_code);
    console.log(data.register_code, 'eeee');
    console.log(data.email, 'emaio');
    console.log(codeVer, 'sdfsfsfsdfsdf');
  }, [])

  const goBack = () => {
    navigation.goBack();
  };

  const verify = async () => {
    try {
      axios.post('https://dashboard-s2v.vrpro.com.ua/api/register/set-register-code', {
        email: data.email,
        register_code: `${codeVer}`,
        password: password,
      })
        .then(({ data }) => {
          console.log("Success:", data);
          navigation.navigate("SingIn");
        }
      )
    } catch (e) {
      console.error('Error: 777777', e)
    }
    // navigation.navigate("MainTabs");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnGoBack} onPress={goBack}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.text}>Verify your Email</Text>
      <Text style={styles.subtext}>Your registration is not completed. Please check your email and enter the verification code</Text>
      <Text style={styles.inputLabelText}>Verification code</Text>
      <TextInput
        style={styles.input}
        placeholder="XXX - XXX"
        placeholderTextColor="#595674"
        value={codeVer}
        onChangeText={setVerCode}
      />
      <Text style={styles.inputLabelText}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#595674"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btnLogin} onPress={verify}>
        <Text style={styles.btnText}>Verify</Text>
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
    paddingTop: 36
  },
  subtext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    paddingTop: 12
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


export default VerifyEmail;

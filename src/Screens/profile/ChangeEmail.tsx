import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";

interface Props {
  navigation: any;
}

const ChangeEmail: React.FC<Props> = ({ navigation }) => {
  const [showCodeSection, setShowCodeSection] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");


  const sendCodeOnEmail = () => {
    setShowCodeSection(true);
  };

  const cancel = () => setShowCodeSection(false);

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>We will send a verification code to this email:</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.content}>iwillcameron@google.com</Text>
      </View>
      {showCodeSection ?
        <View>
          <Text style={styles.inputLabelText}>Verification code</Text>
          <TextInput
            style={styles.input}
            placeholder="XXX - XXX - XXX"
            placeholderTextColor="#595674"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <View style={styles.btnBlock}>
            <TouchableOpacity style={styles.btnReg} onPress={cancel}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnSub]}>
              <Text style={styles.btnText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View> :
        <TouchableOpacity style={styles.btn} onPress={sendCodeOnEmail}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 24,
    paddingHorizontal: 16
  },
  infoBlock: {
    backgroundColor: "#2A2840",
    borderRadius: 14,
    height: 84,
    width: "100%",
    marginTop: 16,
    padding: 16,
    marginBottom: 16,
  },
  subText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 32
  },
  label: {
    color: "#D5D3EF",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20
  },
  content: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    marginTop: 8
  },
  btn: {
    backgroundColor: "#7920C8",
    width: "100%",
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#7920C8"
  },
  btnSub: {
    width: "48%"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  input: {
    backgroundColor: "#2A2840",
    width: "100%",
    height: 56,
    marginRight: 16,
    borderRadius: 14,
    marginTop: 5,
    padding: 16
  },
  inputLabelText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 20,
    paddingTop: 16
  },
  btnReg: {
    backgroundColor: "transparent",
    width: "48%",
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#7920C8"
  },
  btnBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
  }
});


export default ChangeEmail;

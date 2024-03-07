import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import ArrowLeft from "../assets/ArrowLeft";
import axios from "axios";

interface Props {
  navigation: any;
}

const ChangePassword: React.FC<Props> = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [serverMessage, setServerMessage] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const validateForm = () => {
    let isValid = true;
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmNewPasswordError('');

    if (!currentPassword) {
      setCurrentPasswordError('Please enter your current password.');
      isValid = false;
    }

    if (newPassword.length < 8) {
      setNewPasswordError('New password must be at least 8 characters long.');
      isValid = false;
    }

    // Валидация подтверждения пароля
    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError('The new password and confirmation password do not match.');
      isValid = false;
    }

    return isValid;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    try {
      await axios.post('https://dashboard-s2v.vrpro.com.ua/api/password/change', {
        currentPassword: currentPassword,
        newPassword: newPassword,
      }).then(({ data }) => {
        setServerMessage("Your password has been successfully changed.");
        setTimeout(() => {
          navigation.navigate("SignIn");
        }, 3000);
      }).catch((error) => {
        console.error('Error:', error);
        setServerMessage('An error occurred. Please try again.');
      });
    } catch (e) {
      console.error('Change Password Error:', e);
      setServerMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnGoBack} onPress={goBack}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.text}>Change Password</Text>

      <TextInput
        style={[styles.input, currentPasswordError ? { borderColor: 'red', borderWidth: 1 } : {}]}
        placeholder="Current Password"
        placeholderTextColor="#595674"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      {currentPasswordError ? <Text style={styles.errorText}>{currentPasswordError}</Text> : null}

      <TextInput
        style={[styles.input, newPasswordError ? { borderColor: 'red', borderWidth: 1 } : {}]}
        placeholder="New Password"
        placeholderTextColor="#595674"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      {newPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}

      <TextInput
        style={[styles.input, confirmNewPasswordError ? { borderColor: 'red', borderWidth: 1 } : {}]}
        placeholder="Confirm New Password"
        placeholderTextColor="#595674"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
      />
      {confirmNewPasswordError ? <Text style={styles.errorText}>{confirmNewPasswordError}</Text> : null}

      {serverMessage ? <Text style={styles.serverMessage}>{serverMessage}</Text> : null}

      <TouchableOpacity style={styles.btnSubmit} onPress={handleChangePassword}>
        <Text style={styles.btnText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  // Используйте стили из предыдущих компонентов и добавьте новые по необходимости
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
    paddingTop: 36,
  },
  btnSubmit: {
    backgroundColor: "#7920C8",
    width: '100%',
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 24,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnGoBack: {
    paddingTop: 60,
  },
  input: {
    backgroundColor: '#2A2840',
    color: '#fff',
    width: '100%',
    height: 56,
    borderRadius: 14,
    marginTop: 24,
    padding: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  serverMessage: {
    color: '#A64DF4',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ChangePassword;

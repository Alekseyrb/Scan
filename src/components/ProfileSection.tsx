import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowRight from "../assets/ArrowRight";


interface Props {
  children: React.ReactNode;
  text: string;
  route: string;
  navigation?: any;
}

const ProfileSection: React.FC<Props> = ({ children, text, route }) => {
  const navigation = useNavigation();

  const goToScreen = () => {
    // @ts-ignore
    navigation.navigate(route)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.section} onPress={goToScreen}>
        <View style={styles.block}>
          {children}
          <Text style={styles.text}>{text}</Text>
        </View>
        <ArrowRight color="#8A85CC"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8
  },
  section: {
    height: 60,
    width: '100%',
    backgroundColor: '#2A2840',
    borderRadius: 14,
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16
  },
  block: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    paddingLeft: 16
  }
});


export default ProfileSection;

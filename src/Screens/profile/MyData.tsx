import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import DataSection from "../../components/DataSection";

interface Props {
  navigation: any;
}

const MyData: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DataSection label="Full name" content="Cameron Williamson" isEmail={false}/>
      <DataSection label="Email" content="iwillcameron@google.com" isEmail={true}/>
      <DataSection label="Phone" content="+44 797 577 75 77" isEmail={false}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 24,
    paddingHorizontal: 16,
  },
});


export default MyData;

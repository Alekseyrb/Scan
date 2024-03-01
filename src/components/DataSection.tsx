import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import Edit from "../assets/Edit";
import { useNavigation } from "@react-navigation/native";


interface Props {
  // navigation: any;
  label: string;
  content: string;
  isEmail: boolean;
}

const DataSection: React.FC<Props> = ({label, content, isEmail}) => {
  const navigator = useNavigation();
  const [isEdit, setIsEdit] = useState(false);

  const editProfile = () => {
    // @ts-ignore
    return isEmail ? navigator.navigate('ChangeEmail') : setIsEdit(!isEdit);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.block}>
        <Text style={styles.content}>{content}</Text>
        <TouchableOpacity style={styles.edit} onPress={() => editProfile()}>
          <Edit/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2840',
    borderRadius: 14,
    height: 84,
    width: '100%',
    marginTop: 8,
    padding: 16,
  },
  label: {
    color: '#D5D3EF',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },
  content: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginTop: 8
  },
  block: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  edit: {
    backgroundColor: '#7920C8',
    width: 32,
    height: 32,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});


export default DataSection;

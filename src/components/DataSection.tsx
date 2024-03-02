import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import Edit from "../assets/Edit";
import { useNavigation } from "@react-navigation/native";


interface Props {
  // navigation: any;
  label: string;
  content: string;
  isEmail: boolean;
  isField: boolean;
  name: string;
  meData: any;
  handleMeData: any;
}

const DataSection: React.FC<Props> = ({label, content, isEmail, isField, meData, handleMeData, name}) => {
  const navigator = useNavigation();
  const [isEdit, setIsEdit] = useState(false);
  const [isChangeField, setIsChangeField] = useState(false);
  const [change, setChange] = useState(content);

  const editProfile = () => {
    isField ? setIsChangeField(!isChangeField) : setIsChangeField(false)
    // @ts-ignore
    return isEmail ? navigator.navigate('ChangeEmail') : setIsEdit(!isEdit);
  }
  const handleData = (newData: any) => {
    handleMeData({...meData,[name]: newData})
    setChange(newData)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.block}>
        {isChangeField ?
          <TextInput
            style={styles.input}
            placeholder="write new"
            placeholderTextColor="#595674"
            value={change}
            onChangeText={handleData}
          />
          :
          <Text style={styles.content}>{content}</Text>
        }
        {isEmail ? <></> :
        <TouchableOpacity style={styles.edit} onPress={() => editProfile()}>
          <Edit />
        </TouchableOpacity> }
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
  },
  input: {
    // width: '90%',
  },
});


export default DataSection;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import DataSection from "../../components/DataSection";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";

interface Props {
  navigation: any;
}

const MyData: React.FC<Props> = ({ navigation }) => {
  // @ts-ignore
  const { token } = useAuth();
  const getMeData = async () => {
    try {
      const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data, 'resp history');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getMeData();
  }, []);

  const getMedata = {
    name: '',
    // email: '',
    phone: '',
  };
  const [meData,setMedata] = useState(getMedata)

  const handleMeData = (newData: any) => {
    setMedata(newData)
  }

  const updateDate = () => {

  }

  useEffect(()=>{
    console.log(meData);
  },[meData])

  return (
    <View style={styles.container}>
      <DataSection name={'name'} label="Full name" content={meData.name} meData={meData} handleMeData={handleMeData} isEmail={false} isField={true}/>
      <DataSection name={'email'} label="Email" content="iwillcameron@google.com" meData={meData} handleMeData={handleMeData} isEmail={true} isField={false}/>
      <DataSection name={'phone'} label="Phone" content={meData.phone} meData={meData} handleMeData={handleMeData} isEmail={false} isField={true}/>

      <TouchableOpacity style={styles.btn} onPress={updateDate}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
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
  btn: {
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
});


export default MyData;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import WebView from "react-native-webview";
import { useAuth } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ScanScreen({ navigation }) {
  //@ts-ignore
  const { token } = useAuth();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isLoading, setIsLoading] = useState(true);
  const device = useCameraDevice("back");
  const [scanCode,setScanCode] = useState();
  const [docObj,setDocObj] = useState();
  const [resetScreen,setResetScreen] = useState(false);
  const [openDoc, setOpenDoc] = useState(null);

  if (device == null) return <Text>sorry</Text>;

  React.useEffect(() => {
    requestPermission().then((data=>{
      console.log(data,'data');
      
      setIsLoading(false)
    }));
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes: any) => {
      console.log(34);
      setResetScreen(prev=>!prev)
      setScanCode(codes[0].value);
    }
  });
  const getRequstPermision = async () => {
    try {
      axios.post(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/requests`,{
        document_id: scanCode
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }})
        .then(({ data }) => {
          Alert.alert("Permit request has been sent.", `Wait until the author of the document gives you permission and try scanning again.`, [
            { text: "OK", onPress: () => {}}
          ])
          }
        )
    } catch (e) {
      console.log(e,'#ferg4g');
      
    }
  };
  const getDocAcsses = async () => {
    try {
      console.log('getDocAcsses');
      
      axios.post(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/requests`,{
        number: scanCode
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }})
        .then(({ data }) => {
          Alert.alert("Permit request has been sent.", `Wait until the author of the document gives you permission and try scanning again.`, [
            { text: "OK", onPress: () => {}}
          ])
          }
        )
    } catch (e) {
      console.log(e,'#ferg4g');
      
    }
  };
  const getDocByNumber = async (num: any) => {
    try {
      axios.post(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/number/${num}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }})
        .then(({ data }) => {
          setDocObj(data)
          }
        )
    } catch (e) {
      console.log(e,'#ferg4g');
      
    }
  };
  const getDocument = async () => {
    console.log(scanCode);
    
    try {
      axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/${scanCode}/access`,{
        headers: {
          Authorization: `Bearer ${token}`
        }})
        .then(({ data }) => {
          console.log(444444644,data);
          // console.log();
          
            if (data.access) {
              console.log('done');
              //@ts-ignore
              navigation.navigate('DocDetailScan',{
                scanCode: scanCode,
                metadata_only: data.metadata_only
              });

            } else {
              console.log(data.data);
              
              getDocAcsses()
              
            }


          }
        ).catch((e)=>{
          Alert.alert("You do not have access to this document ", ``, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Request permission", onPress: () => getRequstPermision() }
          ]);
         
          console.log(e);
          
        })
    } catch (e) {
      Alert.alert("You do not have access to this document ", ``, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Request permission", onPress: () => getRequstPermision() }
      ]);
    }
  };
  useEffect(()=>{
    if (scanCode){
      getDocument()
    }
  },[scanCode,resetScreen])
  return isLoading ? 
  <View style={[StyleSheet.absoluteFill,{
    backgroundColor: '#151422',
    display: 'flex',
    height: '100%',
    alignItems: 'center'
  }]} >
    <ActivityIndicator style={{marginTop: '70%'}} size="large" color="#76C0FA" /> 
  </View>
  : (
    <>
      {!openDoc ?
        (<Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />) :
        <WebView source={{ uri: openDoc }} style={{ flex: 1 }} />
      }
    </>
  );
}

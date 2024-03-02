import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import WebView from "react-native-webview";
import { useAuth } from "../../store/AuthContext";

export default function ScanScreen() {
  //@ts-ignore
  const { token } = useAuth();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isLoading, setIsLoading] = useState(true);
  const device = useCameraDevice("back");
  const [scanCode,setScanCode] = useState();
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
  const getDocument = async () => {
    try {
      axios.post(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/${scanCode}/download`,{
        headers: {
          Authorization: `Bearer ${token}`
        }})
        .then(({ data }) => {
            setOpenDoc(data)
            console.log("Success:", data);
            
          }
        )
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
  },[scanCode])
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

import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import WebView from "react-native-webview";
import { useAuth } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
 // @ts-ignore
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
    if (!scanCode) return;
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
      // getDocument()
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
        (
          <View style={[StyleSheet.absoluteFill, {
            backgroundColor: '#151422',
          }]}>
            <View style={{
              height: '85%',
              width: '100%',
            }}>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
            />
            </View>
            <TouchableOpacity style={styles.btn} onPress={getDocument}>
              <Text style={styles.btnText}>Scan now</Text>
            </TouchableOpacity>
        </View>) :
        <WebView source={{ uri: openDoc }} style={{ flex: 1 }} />
      }
    </>
  );
}

const styles = StyleSheet.create({
  radioGroupContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 20,
    color: '#A64DF4',
  },
  radioLabel: {
    color: '#FFFFFF',
  },
  customHandle: {

    backgroundColor: '#151422',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  contentContainer: {
    paddingBottom: 24,
    zIndex: 100,
    flex: 1,
    backgroundColor: '#151422',
    paddingHorizontal: 16,
  },
  bottomSheetLabel: {
    color: '#8A85CC',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28
  },
  bottomSheetName: {
    paddingTop: 8,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 32
  },
  bottomSheetEmail: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(21, 20, 34, 1)",
    paddingHorizontal: 16
  },
  drop: {
    backgroundColor: "#2A2840",
    width: "100%",
    height: 56,
    marginRight: 16,
    borderRadius: 14,
    marginTop: 5,
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  labelText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 20,
    paddingTop: 24
  },
  dropText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24
  },
  switchBlock: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  switchBtn: {
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#76C0FA"
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#76C0FA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20
  },
  switchText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#76C0FA"
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
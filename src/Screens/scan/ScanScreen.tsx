import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import WebView from "react-native-webview";

export default function ScanScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const [openDoc, setOpenDoc] = useState(null);

  if (device == null) return <Text>sorry</Text>;

  React.useEffect(() => {
    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes: any) => {
      Alert.alert("Open doc?", `${codes[0].value}`, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => setOpenDoc(codes[0].value) }
      ]);

      console.log(`Scanned ${codes.length} codes!`);
    }
  });
  return (
    // <View>
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

    // </View>
  );
}

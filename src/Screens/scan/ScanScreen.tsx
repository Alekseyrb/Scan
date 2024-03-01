// import React, { useLayoutEffect, useState } from "react";
// import { Text, StyleSheet, Platform, PermissionsAndroid } from "react-native";
// import { Camera, useCameraDevice, useCameraDevices } from "react-native-vision-camera";
// import useCameraPermission from './useCameraPermission'; // Путь к вашему хуку для разрешения на камеру
//
// interface Props {
//   navigation?: any;
// }
// const ScanScreen: React.FC<Props> = ({ navigation }) => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [cameraPosition, setCameraPosition] = React.useState<'front' | 'back'>(
//     'back',
//   );
//   useLayoutEffect(() => {
//     const requestCameraPermission = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             {
//               title: 'Camera Permission',
//               message: 'This app needs access to your camera.',
//               buttonPositive: 'OK',
//             }
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             setHasPermission(true);
//           } else {
//             setHasPermission(false);
//           }
//         } catch (err) {
//           console.warn(err);
//           setHasPermission(false);
//         }
//       } else {
//         // For iOS or other platforms, you may use other permission handling methods
//         // Here, it's assumed that permission is granted for non-Android platforms
//         setHasPermission(true);
//       }
//     };
//
//     requestCameraPermission();
//   });
//
//
//
//   const devices = Camera.getAvailableCameraDevices()
//   const device = devices[0];
//   console.log(devices);
//   // const device = useCameraDevice(); // Предполагается, что это ваш собственный хук для получения устройства камеры
//
//   // if (!hasPermission) {
//   //   return <Text>No camera permission granted.</Text>;
//   // }
//   //
//   // if (device == null) {
//   //   return <Text>Device not found</Text>;
//   // }
//
//   return (
//
//     <Camera
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive={true}
//
//     />
//   );
// };
//
// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: "#777"
//   },
//   textBold: {
//     fontWeight: "500",
//     color: "#000"
//   },
//   buttonText: {
//     fontSize: 21,
//     color: "rgb(0,122,255)"
//   },
//   buttonTouchable: {
//     padding: 16
//   }
// });
//
// export default ScanScreen;

import * as React from 'react';

import { StyleSheet, Text } from 'react-native';
// import { useCameraDevices } from 'react-native-vision-camera';
// import { Camera } from 'react-native-vision-camera';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = React.useState(false);
  // const devices = useCameraDevices();

  // devices.map((device) => {
  //   console.log(device);
  // })

  // const device = devices.back;

  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true,
  // });

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  // React.useEffect(() => {
  //   (async () => {
  //     const status = await Camera.requestCameraPermission();
  //     console.log(status, 'status');
  //   })();
  // }, []);

  // return (
  //   device != null &&
  //   hasPermission && (
  //     <>
  //       <Camera
  //         style={StyleSheet.absoluteFill}
  //         device={device}
  //         isActive={true}
  //         // @ts-ignore
  //         frameProcessor={frameProcessor}
  //         frameProcessorFps={5}
  //       />
  //       {barcodes.map((barcode, idx) => (
  //         <Text key={idx} style={styles.barcodeTextURL}>
  //           {barcode.displayValue}
  //         </Text>
  //       ))}
  //     </>
  //   )
  // );

  return <Text>sss</Text>
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

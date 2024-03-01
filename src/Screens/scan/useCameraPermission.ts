import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';

const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ',
          buttonPositive: 'OK',
        },

      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app needs access to your camera.',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setHasPermission(true);
          } else {
            setHasPermission(false);
          }
        } catch (err) {
          console.warn(err);
          setHasPermission(false);
        }
      } else {
        // For iOS or other platforms, you may use other permission handling methods
        // Here, it's assumed that permission is granted for non-Android platforms
        setHasPermission(true);
      }
    };

    requestCameraPermission();
  }, []);

  return { hasPermission };
};

export default useCameraPermission;

import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useAuth} from '../../store/AuthContext';
import UniversalBottomSheet from '../../components/UniversalBottomSheet';
import { useNavigation } from '@react-navigation/native';

interface Props {
  navigation: any;
}

const SettingScreen: React.FC<Props> = () => {
  // @ts-ignore
  const {logout} = useAuth();
  const navigation = useNavigation();
  const [signOutVisible, setSignOutVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const handleBottomSignOut = () => {
    setDeleteVisible(false);
    setSignOutVisible(prev => !prev);
  };
  const handleLogout = () => {
    logout();
    //@ts-ignore
    navigation.navigate('SingIn');
  };
  const handleBottomDelete = () => {
    setSignOutVisible(false);
    setDeleteVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{...styles.btn, borderColor: '#1C6EAF'}}
        onPress={handleBottomSignOut}>
        <Text style={{...styles.btnText, color: '#1C6EAF'}}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.btn, borderColor: '#F44D4D'}}
        onPress={handleBottomDelete}>
        <Text style={{...styles.btnText, color: '#F44D4D'}}>
          Delete account
        </Text>
      </TouchableOpacity>
      <UniversalBottomSheet
        isVisible={signOutVisible}
        onClose={handleBottomSignOut}
        snapPoints={['26%', '26%']}>
        <>
          <Text style={styles.labelSign}>Sign out:</Text>
          <Text style={styles.sub}>Are you sure want to sign out?</Text>
          <View style={styles.btnBlock}>
            <TouchableOpacity
              onPress={handleBottomSignOut}
              style={{...styles.btnSmall, borderColor: '#8ACCFF'}}>
              <Text style={{...styles.btnText, color: '#8ACCFF'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={{...styles.btnSmall, borderColor: '#7920C8'}}>
              <Text style={{...styles.btnText, color: '#7920C8'}}>
                Sign out
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </UniversalBottomSheet>
      <UniversalBottomSheet
        isVisible={deleteVisible}
        onClose={handleBottomDelete}
        snapPoints={['26%', '26%']}>
        <>
          <Text style={styles.label}>Delete account:</Text>
          <Text style={styles.sub}>
            Are you sure want to delete your account?
          </Text>
          <View style={styles.btnBlock}>
            <TouchableOpacity
              onPress={handleBottomDelete}
              style={{...styles.btnSmall, borderColor: '#8ACCFF'}}>
              <Text style={{...styles.btnText, color: '#8ACCFF'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.btnSmall, borderColor: '#F44D4D'}}>
              <Text style={{...styles.btnText, color: '#F44D4D'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      </UniversalBottomSheet>
      {/* {bottomSheetVis && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['30%', '30%']}
          onChange={handleSheetChanges}
          handleComponent={() => (
            <View style={styles.customHandle}/>
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            
          </BottomSheetView>
        </BottomSheet>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  customHandle: {
    backgroundColor: '#151422',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#151422',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(21, 20, 34, 1)',
    paddingHorizontal: 16,
  },
  btn: {
    width: '100%',
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 16,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  btnBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  btnSmall: {
    backgroundColor: 'transparent',
    width: '48%',
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    color: '#F44D4D',
    paddingTop: 14,
  },
  labelSign: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    color: '#8A85CC',
    paddingTop: 14,
  },
  sub: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#FFFFFF',
    paddingTop: 8,
  },
});

export default SettingScreen;

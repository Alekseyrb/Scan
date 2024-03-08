import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useAuth } from "../../store/AuthContext";


interface Props {
  navigation: any;
}

const SettingScreen: React.FC<Props> = ({ navigation }) => {
   // @ts-ignore
  const { logout } = useAuth()
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetVis, setBottomSheetVis] = useState(false);
  const openBottomSignOut = () => {
    setBottomSheetVis(false)
    setBottomSheetVisible(!bottomSheetVisible)
  }
  const handleLogout = () => {
    logout();
    navigation('SingIn');
  }
  const openBottomDelete = () => {
    setBottomSheetVisible(false)
    setBottomSheetVis(!bottomSheetVis)
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ ...styles.btn, borderColor: "#1C6EAF" }} onPress={openBottomSignOut}>
        <Text style={{ ...styles.btnText, color: "#1C6EAF" }}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.btn, borderColor: "#F44D4D" }} onPress={openBottomDelete}>
        <Text style={{ ...styles.btnText, color: "#F44D4D" }}>Delete account</Text>
      </TouchableOpacity>
      {bottomSheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['30%', '30%']}
          onChange={handleSheetChanges}
          handleComponent={() => (
            <View style={styles.customHandle}/>
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.labelSign}>Sign out:</Text>
            <Text style={styles.sub}>Are you sure want to sign out?</Text>
            <View style={styles.btnBlock}>
              <TouchableOpacity style={{ ...styles.btnSmall, borderColor: '#8ACCFF' }}>
                <Text style={{ ...styles.btnText, color: '#8ACCFF' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.btnSmall, borderColor: '#7920C8' }}>
                <Text style={{ ...styles.btnText, color: '#7920C8' }}>Sign out</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
      {bottomSheetVis && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['30%', '30%']}
          onChange={handleSheetChanges}
          handleComponent={() => (
            <View style={styles.customHandle}/>
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.label}>Delete account:</Text>
            <Text style={styles.sub}>Are you sure want to delete your account?</Text>
            <View style={styles.btnBlock}>
              <TouchableOpacity style={{ ...styles.btnSmall, borderColor: '#8ACCFF' }}>
                <Text style={{ ...styles.btnText, color: '#8ACCFF' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.btnSmall, borderColor: '#F44D4D' }}>
                <Text style={{ ...styles.btnText, color: '#F44D4D' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
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
    backgroundColor: "rgba(21, 20, 34, 1)",
    paddingHorizontal: 16,
  },
  btn: {
    width: "100%",
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 16
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600"
  },
  btnBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  btnSmall: {
    backgroundColor: "transparent",
    width: "48%",
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 28,
    color: '#F44D4D',
    paddingTop: 14,
  },
  labelSign: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 28,
    color: '#8A85CC',
    paddingTop: 14,
  },
  sub: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    color: '#FFFFFF',
    paddingTop: 8,
  }
});


export default SettingScreen;

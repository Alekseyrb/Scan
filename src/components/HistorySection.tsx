import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import axios from "axios";
import { useAuth } from "../store/AuthContext";
import moment from "moment";

interface Props {
  docNumber: string;
  requestDate: string;
  docName: string;
  user: string;
  onPressAllow: any;
  id: any
}

const HistorySection: React.FC<Props> = ({docNumber, requestDate, docName, user, onPressAllow, id}) => {
  const navigator = useNavigation();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  // @ts-ignore
  const { token } = useAuth();
  const goToDoc = (id:string) => {
    // @ts-ignore
    return navigator.navigate('DocDetail', { id });
  }

  const updateAccess = async () =>  {
    await axios.put(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/requests/${id}`,
      {
        access: 0,
        metadata_only:1
      },{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.subBlock}>
          <View style={{marginRight: 21}}>
            <Text style={styles.label}>Doc number</Text>
            <Text style={styles.content}>{docNumber}</Text>
          </View>
          <View>
            <Text style={styles.label}>Document name</Text>
            <Text style={styles.content}>{docName}</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 4}}>
        <View style={styles.subBlock}>
          <View style={{marginRight: 24}}>
            <Text style={styles.label}>Create date</Text>
            <Text style={styles.content}>{moment(requestDate).format('DD-MM-YYYY')}</Text>
          </View>
          <View>
            <Text style={styles.label}>User</Text>
            <Text style={styles.content}>{user}</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnBlock}>
        <TouchableOpacity style={styles.btnReg} onPress={updateAccess}>
          <Text style={styles.btnText}>Deny</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSub]} onPress={onPressAllow}>
          <Text style={styles.btnGreenText}>Allow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#2A2840',
    borderRadius: 14,
    height: 200,
    width: '100%',
    marginTop: 16,
    padding: 16,
  },
  label: {
    color: '#A19CE0',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },
  content: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  block: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  subBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: "#F44D4D",
    fontSize: 16,
    fontWeight: "600"
  },
  btnGreenText: {
    color: "#09E510",
    fontSize: 16,
    fontWeight: "600"
  },
  btnReg: {
    backgroundColor: "transparent",
    width: "48%",
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#F44D4D"
  },
  btnBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
  },
  btn: {
    width: "100%",
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#09E510"
  },
  btnSub: {
    width: "48%"
  },
});


export default HistorySection;

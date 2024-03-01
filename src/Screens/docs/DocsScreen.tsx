import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import ArrowDown from "../../assets/ArrowDown";
import DocumentSection from "../../components/DocumentSection";
import HistorySection from "../../components/HistorySection";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import RadioGroup from 'react-native-radio-buttons-group';
import { useAuth } from "../../store/AuthContext";
import axios from "axios";

interface Props {
}

const DocsScreen: React.FC<Props> = () => {
  const [show, setShow] = useState(true);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const showDocs = (show: boolean) => {
    setShow(show);
    setBottomSheetVisible(false)
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const radioButtons = useMemo(() => ([
    {
      id: '1',
      label: 'Metadata only',
      value: 'option1'
    },
    {
      id: '2',
      label: 'Metadata and document',
      value: 'option2'
    }
  ]), []);

  const [selectedId, setSelectedId] = useState();
  const [docs, setDocs] = useState([])
  // @ts-ignore
  const { token } = useAuth();

useEffect(() => {
  console.log(token, 'token');
  fetchUsers()
},[])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data, 'resp');
      setDocs(response.data.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.switchBlock}>
          <TouchableOpacity style={[styles.switchBtn, show ? null : { borderColor: "#2A2840" }]}
                            onPress={() => showDocs(true)}>
            <Text style={[styles.switchText, show ? null : { color: "#8A85CC" }]}>Documents</Text>
            <View style={[styles.square, show ? null : { backgroundColor: "#2A2840" }]}><Text
              style={[styles.text, show ? null : { color: "#fff" }]}>2</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.switchBtn, show ? { borderColor: "#2A2840" } : null]}
                            onPress={() => showDocs(false)}>
            <Text style={[styles.switchText, show ? { color: "#8A85CC" } : null]}>History</Text>
            <View style={[styles.square, show ? { backgroundColor: "#2A2840" } : null]}><Text
              style={[styles.text, show ? { color: "#fff" } : null]}>9</Text></View>
          </TouchableOpacity>
        </View>
        {show ?
          <>
            <Text style={styles.labelText}>Company creator</Text>
            <View style={styles.drop}>
              <Text style={styles.dropText}>All companies</Text>
              <ArrowDown />
            </View>
            <View style={{ marginTop: 8 }}>
              <FlatList
                data={docs}
                renderItem={({ item }) => (
                  // @ts-ignore
                  <DocumentSection docNumber={item.number} dataCreate={item.created_at} docName={item.name} id={item.id}/>
                )}
                // @ts-ignore
                keyExtractor={(item) => item?.id.toString()}
              />
            </View>
          </> :
          <HistorySection docNumber="KO34342" requestDate="31-12-2024" docName="Bank statement" user="Kathryn Murphy"
                          onPressAllow={() => setBottomSheetVisible(!bottomSheetVisible)} />
        }
      </View>
      {bottomSheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['55%', '55%']}
          onChange={handleSheetChanges}
          handleComponent={() => (
            <View style={styles.customHandle}/>
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.bottomSheetLabel}>Access for: </Text>
            <Text style={styles.bottomSheetName}>Kathryn Murphy</Text>
            <Text style={styles.bottomSheetEmail}>kathrinmurphyshy@gmail.com</Text>
            <RadioGroup
              radioButtons={radioButtons}
              // @ts-ignore
              onPress={setSelectedId}
              selectedId={selectedId}
              containerStyle={styles.radioGroupContainer}
              labelStyle={styles.radioLabel}
            />
            <Text style={styles.labelText}>Access time period</Text>
            <View style={styles.drop}>
              <Text style={styles.dropText}>Day</Text>
              <ArrowDown />
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  radioGroupContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 20,
    color: '#A64DF4',
    // backgroundColor:  'red'
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
    backgroundColor: "#000",
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


export default DocsScreen;

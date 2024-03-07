import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ScrollView } from "react-native";
import HistorySection from "../../components/HistorySection";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import RadioGroup from "react-native-radio-buttons-group";
import ArrowDown from "../../assets/ArrowDown";

interface Props {}

const HistoryScreen: React.FC<Props> = () => {
  const [history, setHistory] = useState([])
  // @ts-ignore
  const { token } = useAuth();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const radioButtons = useMemo(() => ([
    {
      id: 0,
      label: 'Metadata only',
      value: 'option1'
    },
    {
      id: 1,
      label: 'Metadata and document',
      value: 'option2'
    }
  ]), []);

  useEffect(() => {
    getHistory()
  },[])
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [idForUpt, setIdForUpt] = useState();
  const [selectedId, setSelectedId] = useState();

  const openBottomSheet = (id:any, ) => {
    setBottomSheetVisible(!bottomSheetVisible)
    setIdForUpt(id)
  }

  const getHistory = async () => {
    try {
      const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data, 'resp history');
      setHistory(response.data.data)
      console.error(22222,response.data.data,1111);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateAccess = async (id:any, selectedId:any) =>  {
    await axios.put(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/requests/${id}`,
      {
        access: 1,
        metadata_only:selectedId
      },{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
                {history.reverse().map(item=>(
                   // @ts-ignore
                  <HistorySection docNumber={item.number} requestDate={item.created_at} docName={item.name} user={item.user.name} onPressAllow={() => openBottomSheet(item.id)} id={item.id}/>
                ))}
              
              </ScrollView>
      
      {bottomSheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['60%', '60%']}
          onChange={handleSheetChanges}
          handleComponent={() => (
            <View style={styles.customHandle}/>
          )}
          containerStyle={{
            backgroundColor: 'rgba(21, 20, 34, 0.8)'
          }}
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
            <TouchableOpacity style={styles.btn} onPress={() => updateAccess(idForUpt, selectedId)}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>

  );
};

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
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16
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


export default HistoryScreen;

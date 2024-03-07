import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import ArrowDown from "../../assets/ArrowDown";
import DocumentSection from "../../components/DocumentSection";
import HistorySection from "../../components/HistorySection";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import RadioGroup from 'react-native-radio-buttons-group';
import { useAuth } from "../../store/AuthContext";
import axios from "axios";
import WebView from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import Dropdown from "../../components/Dropdown";

interface Props {
}

const DocsScreen: React.FC<Props> = () => {
  const route = useRoute();
  const [show, setShow] = useState(true);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const showDocs = (show: boolean) => {
    setShow(show);
    setBottomSheetVisible(false)
  };
  useEffect(() => {
    // Если параметр передан, обновляем активную вкладку
    if (route.params && route.params?.activeTab) {
      showDocs(route.params?.activeTab === 'docs');
    }
  }, [route.params]);
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

  const [selectedId, setSelectedId] = useState();
  const [docs, setDocs] = useState([])
  const [docCount, setDocCount] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  
  const [history, setHistory] = useState([])
  const [historyCount, setHistoryCount] = useState();
  const [idForUpt, setIdForUpt] = useState();
  // @ts-ignore
  const { token } = useAuth();

  const handleClosePress = () => setShow(false);
useEffect(() => {
  console.log(token, 'token');
  fetchUsers()
  getHistory()
},[])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     
      setDocs(response.data.data)
      setDocCount(response.data.data.length)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

const getHistory = async () => {
  try {
    const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/requests`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data.data, 'resp history');
    setHistory(response.data.data)
    setHistoryCount(response.data.data.length)
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

  const openBottomSheet = (id:any, ) => {
    setBottomSheetVisible(!bottomSheetVisible)
    setIdForUpt(id)
  }
  const companies: any = [];
  const options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    // Add more options as needed
  ];

  const handleSelect = (option:any) => {
    console.log('Selected option:', option);
    // Perform any action after selection
  };
  // return (<WebView source={{ uri: 'http://docs.google.com/gview?embedded=true&url=https://dashboard-s2v.vrpro.com.ua/documents/ul24030269.pdf' }} style={StyleSheet.absoluteFill} />)
  return (
    <>
    <View style={styles.container} onPress={handleClosePress} activeOpacity={1}>
        <View style={styles.switchBlock}>
          <TouchableOpacity style={[styles.switchBtn, show ? null : { borderColor: "#2A2840" }]}
                            onPress={() => showDocs(true)}>
            <Text style={[styles.switchText, show ? null : { color: "#8A85CC" }]}>Documents</Text>
            <View style={[styles.square, show ? null : { backgroundColor: "#2A2840" }]}><Text
              style={[styles.text, show ? null : { color: "#fff" }]}>{docCount}</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.switchBtn, show ? { borderColor: "#2A2840" } : null]}
                            onPress={() => showDocs(false)}>
            <Text style={[styles.switchText, show ? { color: "#8A85CC" } : null]}>History</Text>
            <View style={[styles.square, show ? { backgroundColor: "#2A2840" } : null]}><Text
              style={[styles.text, show ? { color: "#fff" } : null]}>{historyCount}</Text></View>
          </TouchableOpacity>
        </View>
        {show ?
          <>
            <Text style={styles.labelText}>Company creator</Text>
            <Dropdown options={options} onSelect={handleSelect} >
            <View style={styles.drop}>
            <Text style={styles.dropText}>{selectedCompany}</Text>
            <ArrowDown />
          </View></Dropdown>
          
            <View style={{ marginTop: 8, height: '70%' }}>
              <ScrollView>
                {docs.reverse().map(item=>(
                   // @ts-ignore
                  <DocumentSection docNumber={item.number} dataCreate={item.created_at} docName={item.name} id={item.id}/>
                ))}
              </ScrollView>
              {/* <FlatList
                data={docs}
                renderItem={({ item }) => (
                  // @ts-ignore
                  <DocumentSection docNumber={item.number} dataCreate={item.created_at} docName={item.name} id={item.id}/>
                )}
                // @ts-ignore
                keyExtractor={(item) => item?.id.toString()}
              /> */}
            </View>
          </> :
          <View style={{ marginTop: 8 }}>
            {history.length> 0 && <FlatList
              data={history}
              renderItem={({ item }) => {
                // console.error(item);
                
                // return null
                return (
                // @ts-ignore
                <HistorySection docNumber={item?.document?.number} requestDate={item?.created_at} docName={item?.document?.name} user={item?.from_user?.name} id={item?.id} onPressAllow={() => openBottomSheet(item.id)} />
              )}}
              // @ts-ignore
              keyExtractor={(item) => item?.id.toString()}
            />}
          </View>
          // <HistorySection docNumber="KO34342" requestDate="31-12-2024" docName="Bank statement" user="Kathryn Murphy"
          //                 onPressAllow={() => setBottomSheetVisible(!bottomSheetVisible)} />
        }
      </View>
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
    </>
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
  dropdownContainer: {
    backgroundColor: "#2A2840",
    borderRadius: 14,
    marginTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 16,
    maxHeight: 200, // Set a max-height to prevent the dropdown from taking too much space
    overflow: 'scroll', // Allows scrolling within the dropdown if there are many items
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
});


export default DocsScreen;

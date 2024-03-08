import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Share, Alert, Linking, ActivityIndicator } from "react-native";
import { Link, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import WebView from "react-native-webview";

interface Props {
  navigation: any;
}

const DocDetailScan: React.FC<Props> = () => {
  const route = useRoute();
  // @ts-ignore
  const { scanCode, metadata_only } = route.params;
  // console.log(333333,scanCode, metadata_only);
  // @ts-ignore
  const { token } = useAuth();

  const [doc, setDoc] = useState<any>()
  const [pageLoading, setPageLoading] = useState(true)
  const [link, setLink] = useState<boolean>(false)

  const getDoc = async () => {
    try {
      const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/number/${scanCode}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data, 'resp');
      setDoc(response.data.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getView = async () => {
    setLink(true)
    // try {
    //   // console.error(111111);
      
    //   const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/${scanCode}/download`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    //   // console.log(response.data,'response');
      
      // Linking.openURL(doc?.file_url);
    //   // console.log(response.data.data, 'resp');
      
    // } catch (error) {
    //   console.error('Error fetching users:', error);
    // }
  };
  function hideSpinner() {
    setPageLoading(false)
  }

  useEffect(() => {
    getDoc()
    if (!metadata_only){
    
    }
    return ()=>{
      setLink(false)
    }
  },[])


  const handleDownload = (url:any) => {
    Linking.openURL(url);
  };

  return !link ? (
    <View style={styles.container}>
      <View style={styles.containerBlock}>
        <View style={styles.block}>
          <View style={styles.subBlock}>
            <View style={{ marginRight: 21 }}>
              <Text style={styles.label}>Doc number</Text>
              
              <Text style={styles.content}>{doc?.number}</Text>
            </View>
            <View>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.content}>{doc?.created_at}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 4 }}>
          <View style={styles.subBlock}>
            <View style={{ marginRight: 24 }}>
              <Text style={styles.label}>Document name</Text>
              <Text style={styles.content}>{doc?.name}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.btnBlock}>
      {!metadata_only && <TouchableOpacity style={styles.btn} onPress={getView}>
              <Text style={styles.btnText}>View</Text>
      </TouchableOpacity>}
      </View>
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <WebView
        onLoad={() => hideSpinner()}
        style={{ flex: 1 }}
        source={{ uri: `http://docs.google.com/gview?embedded=true&url=${doc?.file_url}` }}
      />
      {pageLoading && (
        <ActivityIndicator
          style={{ position: "absolute", top: '50%',  }}
          size="large"
        />
      )}
    </View>
    // <WebVie .w source={{ uri: `http://docs.google.com/gview?embedded=true&url=${doc?.file_url}` }} style={StyleSheet.absoluteFill} />
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(21, 20, 34, 1)",
    paddingHorizontal: 16
  },
  containerBlock: {
    backgroundColor: "#2A2840",
    borderRadius: 14,
    borderWidth: 1,
    height: 125,
    width: "100%",
    marginTop: 8,
    padding: 16
  },
  subContainerBlock: {
    backgroundColor: "#2A2840",
    borderRadius: 14,
    borderWidth: 1,
    height: 240,
    width: "100%",
    marginTop: 8,
    padding: 16
  },
  label: {
    color: "#A19CE0",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20
  },
  content: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24
  },
  block: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  subBlock: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  btnSub: {
    width: "48%"
  },
  btnText: {
    color: "#A64DF4",
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
    borderColor: "#7920C8"
  },
  btnBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
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
  }
});


export default DocDetailScan;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Share, Alert, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";

interface Props {
  navigation: any;
}

const DocDetail: React.FC<Props> = () => {
  const route = useRoute();
  // @ts-ignore
  const { id } = route.params;
  console.log(id);
  // @ts-ignore
  const { token } = useAuth();

  const [doc, setDoc] = useState()

  const getDoc = async () => {
    try {
      const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/${id}`, {
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

  useEffect(() => {
    getDoc()
  },[])

  const onShare = async (url:any) => {
    try {
      const result = await Share.share({
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleDownload = (url:any) => {
    Linking.openURL(url);
  };

  return (
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
      {/*<View style={styles.subContainerBlock}>*/}
      {/*  <View style={styles.block}>*/}
      {/*    <View style={styles.subBlock}>*/}
      {/*      <View style={{ marginRight: 21 }}>*/}
      {/*        <Text style={styles.label}>Document reg</Text>*/}
      {/*        <Text style={styles.content}>KO34342</Text>*/}
      {/*      </View>*/}
      {/*      <View>*/}
      {/*        <Text style={styles.label}>Expire</Text>*/}
      {/*        <Text style={styles.content}>{doc?.expire_at}</Text>*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View style={{ marginTop: 4 }}>*/}
      {/*    <View style={styles.subBlock}>*/}
      {/*      <View style={{ marginRight: 24 }}>*/}
      {/*        <Text style={styles.label}>Name on document</Text>*/}
      {/*        <Text style={styles.content}>Silva Moralez</Text>*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View style={{ marginTop: 4 }}>*/}
      {/*    <View style={styles.subBlock}>*/}
      {/*      <View style={{ marginRight: 24 }}>*/}
      {/*        <Text style={styles.label}>Account</Text>*/}
      {/*        <Text style={styles.content}>3533 3656 3636 1256</Text>*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View style={{ ...styles.block, marginTop: 8 }}>*/}
      {/*    <View style={styles.subBlock}>*/}
      {/*      <View style={{ marginRight: 21 }}>*/}
      {/*        <Text style={styles.label}>Bank</Text>*/}
      {/*        <Text style={styles.content}>Barclays</Text>*/}
      {/*      </View>*/}
      {/*      <View style={{ marginRight: 21 }}>*/}
      {/*        <Text style={styles.label}>Amount</Text>*/}
      {/*        <Text style={styles.content}>40 000</Text>*/}
      {/*      </View>*/}
      {/*      <View>*/}
      {/*        <Text style={styles.label}>Currency</Text>*/}
      {/*        <Text style={styles.content}>GBP</Text>*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</View>*/}
      <View style={styles.btnBlock}>
        <TouchableOpacity style={styles.btnReg} onPress={() => onShare(doc?.file_url)}>
          <Text style={styles.btnText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSub]} onPress={() => handleDownload(doc?.file_url)}>
          <Text style={styles.btnGreenText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
    width: "100%",
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#09E510"
  }
});


export default DocDetail;

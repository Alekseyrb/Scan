import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowRight from "../assets/ArrowRight";
import moment from "moment";


interface Props {
  docNumber: string;
  dataCreate: string;
  docName: string;
  companyName: string;
  id: any;
}

const DocumentSection: React.FC<Props> = ({docNumber, dataCreate, docName, id, companyName}) => {
  const navigator = useNavigation();

  const goToDoc = (id:any) => {
    // @ts-ignore
    return navigator.navigate('DocDetail', { id });
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
            <Text style={styles.label}>Data creation</Text>
            <Text style={styles.content}>{moment(dataCreate).format('DD-MM-YYYY')}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => goToDoc(id)}>
          <ArrowRight color="#fff"/>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 4}}>
        <View style={styles.subBlock}>
          <View style={{marginRight: 24}}>
            <Text style={styles.label}>Document name</Text>
            <Text style={styles.content}>{docName}</Text>
          </View>
          <View>
           <Text style={styles.label}>Company creator</Text>
           <Text style={styles.content}>{companyName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2840',
    borderRadius: 14,
    borderColor: '#A864E4',
    borderWidth: 1,
    height: 125,
    width: '100%',
    marginTop: 8,
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
  btn: {
    backgroundColor: '#7920C8',
    width: 32,
    height: 32,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});


export default DocumentSection;

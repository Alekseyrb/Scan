import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import HistorySection from "../../components/HistorySection";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";

interface Props {}

const HistoryScreen: React.FC<Props> = () => {
  const [history, setHistory] = useState([])
  // @ts-ignore
  const { token } = useAuth();

  useEffect(() => {
    getHistory()
  },[])

  const getHistory = async () => {
    try {
      const response = await axios.get(`https://dashboard-s2v.vrpro.com.ua/api/app/documents/requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data, 'resp history');
      setHistory(response.data.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          // @ts-ignore
          <HistorySection docNumber={item.number} requestDate={item.created_at} docName={item.name} user={item.user.name}
                          onPressAllow={() => console.log('click')} />
        )}
        // @ts-ignore
        keyExtractor={(item) => item?.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16
  },
});


export default HistoryScreen;

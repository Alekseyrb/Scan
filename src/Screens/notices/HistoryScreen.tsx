import React from "react";
import { View, StyleSheet } from "react-native";
import HistorySection from "../../components/HistorySection";

interface Props {}

const HistoryScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <HistorySection docNumber="KO34342" requestDate="31-12-2024" docName="Bank statement" user="Kathryn Murphy"
                      onPressAllow={() => console.log('ddd')} />
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

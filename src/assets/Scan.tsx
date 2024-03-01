import React from 'react';
import { Svg, Path } from "react-native-svg";
import { StyleSheet, View } from "react-native";

const Scan = () => {
  return (
    <View style={styles.container}>
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <Path
          d="M1.33334 1.33334H6.00001V2.66668H2.66668V6.00001H1.33334V1.33334ZM10 1.33334H14.6667V6.00001H13.3333V2.66668H10V1.33334ZM1.33334 7.33334H14.6667V8.66668H1.33334V7.33334ZM2.66668 10V13.3333H6.00001V14.6667H1.33334V10H2.66668ZM14.6667 10V14.6667H10V13.3333H13.3333V10H14.6667Z"
          fill="white" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: '#A64DF4',
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
})

export default Scan;

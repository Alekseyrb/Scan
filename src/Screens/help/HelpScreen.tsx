import React from "react";
import { View, StyleSheet } from "react-native";
import Profile from "../../assets/Profile";
import ProfileSection from "../../components/ProfileSection";

interface Props {}

const HelpScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <ProfileSection text="My data" route="MyData">
        <Profile/>
      </ProfileSection>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 32,
  }
});


export default HelpScreen;

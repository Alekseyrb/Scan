import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileSection from "../../components/ProfileSection";
import Profile from "../../assets/Profile";
import Key from "../../assets/Key";
import Setting from "../../assets/Setting";

interface Props {
  navigation: any;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ProfileSection text="My data" route="MyData">
        <Profile/>
      </ProfileSection>
      <ProfileSection text="Change password" route="MyData">
        <Key/>
      </ProfileSection>
      <ProfileSection text="Settings" route="Settings">
        <Setting/>
      </ProfileSection>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(21, 20, 34, 1)",
    paddingTop: 32,
  },
});


export default ProfileScreen;

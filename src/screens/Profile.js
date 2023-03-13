import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Playingscr({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
});

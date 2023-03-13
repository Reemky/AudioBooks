import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Switch, StatusBar } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../../config/themeContext";
export default function Homescr({ navigation }) {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);
  return (
    <View style={[styles.container, { backgroundColor: theme.bgColor }]}>
      <StatusBar barStyle={theme.statusBarColor} />

      <Text style={[styles.text, { color: theme.txtColorPrimary }]}>
        Library
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});

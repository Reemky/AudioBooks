import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Switch, StatusBar } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../../config/themeContext";

import SwitchWithIcons from "react-native-switch-with-icons";
import lightMode from "../../assets/images/lightMode.png";
import darkMode from "../../assets/images/darkMode.png";

export default function Homescr({ navigation }) {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);
  return (
    <View style={[styles.container, { backgroundColor: theme.bgColor }]}>
      <StatusBar barStyle={theme.statusBarColor} />

      <Text style={[styles.text, { color: theme.txtColorPrimary }]}>Hi</Text>
      <SwitchWithIcons
        // disabled
        trackColor={{
          true: theme.switchTrackColor,
          false: theme.switchTrackColor,
        }}
        thumbColor={{
          true: theme.switchThumbColor,
          false: theme.switchThumbColor,
        }}
        value={mode}
        onValueChange={(value) => {
          setMode(value);
          EventRegister.emit("changeTheme", value);
        }}
        icon={{ true: darkMode, false: lightMode }}
        iconColor={{
          true: theme.switchIconColor,
          false: theme.switchIconColor,
        }}
      />
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

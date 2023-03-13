import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Icon from "react-native-vector-icons/Ionicons";

import themeContext from "../../config/themeContext";
import { EventRegister } from "react-native-event-listeners";

import SwitchWithIcons from "react-native-switch-with-icons";
import lightMode from "../../assets/images/lightMode.png";
import darkMode from "../../assets/images/darkMode.png";

import CustomOTP from "../components/CustomOTP";

export default function Resetscr({ navigation }) {
  const { width } = Dimensions.get("window");
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);
  return (
    <View style={[styles.container, { backgroundColor: theme.bgColor }]}>
      <StatusBar barStyle={theme.statusBarColor} />

      {/* Previous screen */}
      <View
        style={{
          marginTop: 75,
          flexDirection: "row",
          width: width,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("Login")}
        >
          <Icon
            name={"ios-chevron-back"}
            style={{
              fontSize: 20,
              color: theme.prevScreenIconColor,
              marginLeft: 30,
            }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.scrTitle,
            {
              fontWeight: 200,
              fontSize: 23,
              color: theme.txtColorPrimary,
              width: "76%",
            },
          ]}
        >
          Reset Password
        </Text>
      </View>
      <View>
        <Image
          style={styles.gif}
          source={require("../../assets/images/done.gif")}
        />
      </View>
      {/* Title */}
      <View
        style={{
          marginTop: 70,
        }}
      >
        <Text
          style={[
            styles.scrTitle,
            {
              color: theme.txtColorPrimary,
            },
          ]}
        >
          Your password has been changhed
        </Text>
      </View>

      <SwitchWithIcons
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
    alignItems: "center",
  },
  scrTitle: {
    fontSize: 30,
    color: "#3d3b3a",
    textAlign: "center",
    width: 300,
  },
  gif: {
    height: 120,
    width: 120
  }
});

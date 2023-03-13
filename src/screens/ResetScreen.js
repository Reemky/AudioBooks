import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Keyboard,
} from "react-native";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import Icon from "react-native-vector-icons/Ionicons";

import themeContext from "../../config/themeContext";
import { EventRegister } from "react-native-event-listeners";

import SwitchWithIcons from "react-native-switch-with-icons";
import lightMode from "../../assets/images/lightMode.png";
import darkMode from "../../assets/images/darkMode.png";

import CustomOTP from "../components/CustomOTP";
import CustomInput from "../components/CustomInput";

export default function Resetscr({ navigation }) {
  const { width } = Dimensions.get("window");

  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    firstname: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();

    let valid = true;

    //check if email is empty
    if (!inputs.email) {
      handleError("Please enter your e-mail", "email");
      valid = false;
      //check if email is invalid
    } else if (
      !inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)
    ) {
      handleError("Invalid e-mail", "email");
      valid = false;
    }

    if (valid) {
      navigation.navigate("OTP");
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

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
              width: "78%",
            },
          ]}
        >
          Forget Password
        </Text>
      </View>

      {/* Title */}
      <View
        style={{
          marginTop: 100,
        }}
      >
        <Text
          style={[
            styles.scrTitle,
            {
              color: theme.txtColorPrimary,
              fontSize: 35,
            },
          ]}
        >
          Plese enter your email
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 150,
        }}
      >
        <CustomInput
          onChangeText={(text) => handleOnchange(text, "email")}
          iconName="mail-outline"
          placeholder="E-mail"
          error={errors.email}
          onFocus={() => {
            handleError(null, "email");
          }}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <CustomButton label="Register" onPress={validate} />
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
    fontSize: 40,
    color: "#3d3b3a",
    textAlign: "center",
  },
});

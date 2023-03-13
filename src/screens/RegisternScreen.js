import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Switch,
  StatusBar,
  Dimensions,
} from "react-native";
import { NativeBaseProvider, HStack, VStack } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import themeContext from "../../config/themeContext";
import { EventRegister } from "react-native-event-listeners";

import SwitchWithIcons from "react-native-switch-with-icons";
import lightMode from "../../assets/images/lightMode.png";
import darkMode from "../../assets/images/darkMode.png";

export default function Loginscr({ navigation }) {
  const { width } = Dimensions.get("window");

  const [inputs, setInputs] = useState({
    email: "",
    firstname: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();

    let valid = true;

    //check if name is empty
    if (!inputs.firstname) {
      handleError("Please enter your first name", "firstname");
      valid = false;

      //check if name is invalid
    } else if (!inputs.firstname.match(/^[a-zA-Z]{2,40}$/)) {
      handleError("Min. length is 2 letters", "firstname");
      valid = false;
    }

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

    //check if password is empty

    if (!inputs.password) {
      handleError("Please enter your password", "password");
      valid = false;

      //check if password is invalid
    } else if (
      !inputs.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      )
    ) {
      handleError("Invalid password", "password");
      valid = false;
    }

    if (valid) {
      navigation.navigate("Homepg");
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={theme.statusBarColor} />

      <View style={[styles.container, { backgroundColor: theme.bgColor }]}>
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
            onPress={() => navigation.navigate("Onboarding")}
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
                width: "75.8%",
              },
            ]}
          >
            Register{" "}
          </Text>
        </View>
        <View
          style={{
            marginTop: 70,
          }}
        >
          <Text
            style={[
              styles.scrTitle,
              {
                fontWeight: 400,
                color: theme.txtColorPrimary,
                marginBottom: 10,
              },
            ]}
          >
            Welcome
          </Text>
        </View>

        <View style={{ marginTop: 15, justifyContent: "center" }}>
          <CustomInput
            onChangeText={(text) => handleOnchange(text, "firstname")}
            iconName="person-outline"
            placeholder="First name"
            error={errors.firstname}
            onFocus={() => {
              handleError(null, "firstname");
            }}
          />

          <CustomInput
            onChangeText={(text) => handleOnchange(text, "email")}
            iconName="mail-outline"
            placeholder="E-mail"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
          />

          <CustomInput
            onChangeText={(text) => handleOnchange(text, "password")}
            iconName="lock-closed-outline"
            placeholder="Password"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
          />
          <View style={{ marginTop: 1 }}>
            <Text style={[styles.rules, { color: theme.rulesColor }]}>
              • Minimum of 8 characters
            </Text>
            <Text style={[styles.rules, { color: theme.rulesColor }]}>
              • Uppercase, lowercase letters and numbers
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <CustomButton label="Register" onPress={validate} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 250,
            marginTop: 25,
            marginBottom: 15,
          }}
        >
          <View style={{ flex: 1, height: 0.8, backgroundColor: "#bababa" }} />
          <View>
            <Text
              style={{
                fontWeight: 300,
                fontSize: 14,
                color: theme.txtColorPrimary,
                textAlign: "center",
                fontStyle: "italic",
                width: 35,
              }}
            >
              or
            </Text>
          </View>
          <View style={{ flex: 1, height: 0.8, backgroundColor: "#bababa" }} />
        </View>

        <View>
          <VStack space={1}>
            <TouchableOpacity activeOpacity={0.7}>
              <View
                style={[
                  styles.socialBtn,
                  { backgroundColor: theme.googleBtnColor },
                ]}
              >
                <HStack space={6}>
                  <Image
                    source={require("../../assets/images/googlewhite.png")}
                    style={styles.logoG}
                  ></Image>
                  <Text style={styles.logoTextG}>Continue with Google</Text>
                </HStack>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <View
                style={[
                  styles.socialBtn,
                  { backgroundColor: theme.facebookBtnColor },
                ]}
              >
                <HStack space={0}>
                  <Image
                    source={require("../../assets/images/facebookwhite.png")}
                    style={styles.logoF}
                  ></Image>
                  <Text style={styles.logoTextF}>Continue with Facebook</Text>
                </HStack>
              </View>
            </TouchableOpacity>
          </VStack>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignSelf: "center",
            marginTop: 30,
            // paddingRight: 20
          }}
        >
          <Text
            style={{
              color: "#505050",
              fontSize: 13,
              fontWeight: 300,
              color: theme.txtColorPrimary,
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{
                color: theme.linkedTxtColor,
                fontSize: 13,
                textAlign: "center",
                fontWeight: 400,
                marginTop: 5,
              }}
            >
              Login now
            </Text>
          </TouchableOpacity>
        </View>
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
    </NativeBaseProvider>
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
  logoG: {
    width: 20,
    height: 20,
  },
  logoF: {
    width: 10,
    height: 20,
    marginRight: 20,
  },
  logoTextG: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 600,
  },
  logoTextF: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 600,
  },

  socialBtn: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 9,
    borderRadius: 12,
    width: 300,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  forgetPass: {
    textAlign: "right",
  },
  register: {
    color: "#505050",
    fontSize: 13,
    textAlign: "right",
    paddingRight: 46,
  },
  rules: {
    textAlign: "left",
    fontStyle: "italic",
    fontSize: 12,
    marginLeft: 6,
    marginTop: 6,
    letterSpacing: 0.2,
  },
});

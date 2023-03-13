import { Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useContext } from "react";
import themeContext from "../../config/themeContext";


export default CustomButton = ({ label, onPress = () => {}, state, iconName }) => {
  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      activeOpacity={state === "disabled" ? 1 : 0.7}
      onPress={onPress}
      style={state === "disabled" ? [styles.disabledBtn] : [styles.enabledBtn, {backgroundColor: theme.btnColor}]}
    >
      <Text
        style={
          state === "disabled" ? [styles.disabledText] : [styles.enabledText, {color: theme.btnTxtColor}]
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  enabledBtn: {
    // backgroundColor: "#3d3b3a",
    width: 300,
    height: 42,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
  },
  disabledBtn: {
    backgroundColor: "#dadada",
    width: 300,
    height: 42,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
  },
  enabledText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
  },
  disabledText: {
    color: "#ababab",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
  },
});

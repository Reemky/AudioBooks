import React, { useState, useContext, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import themeContext from "../../config/themeContext";

export default CustomOTP = ({ maxLen, error, ...props }) => {
  const theme = useContext(themeContext);

  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {/* 1 */}
      <View
        style={[
          styles.textContainer,
          {
            borderColor: error ? theme.errorColor : theme.otpInputColor,
          },
        ]}
      >
        <TextInput
          ref={pin1Ref}
          keyboardType="number-pad"
          maxLength={maxLen}
          onChange={(pin1) => {
            setPin1(pin1);
            if (pin1 !== "") {
              pin2Ref.current.focus();
            }
          }}
          style={[styles.inputText, { color: theme.txtColorPrimary }]}
          autoCorrect={false}
          {...props}
        />
      </View>

      {/* 2 */}

      <View
        style={[styles.textContainer, { borderColor: theme.otpInputColor }]}
      >
        <TextInput
          ref={pin2Ref}
          keyboardType="number-pad"
          maxLength={maxLen}
          onChange={(pin2) => {
            setPin1(pin2);
            if (pin2 !== "") {
              pin3Ref.current.focus();
            }
          }}
          style={[styles.inputText, { color: theme.txtColorPrimary }]}
          autoCorrect={false}
          {...props}
        />
      </View>

      {/* 3 */}

      <View
        style={[styles.textContainer, { borderColor: theme.otpInputColor }]}
      >
        <TextInput
          ref={pin3Ref}
          keyboardType="number-pad"
          maxLength={maxLen}
          onChange={(pin3) => {
            setPin1(pin3);
            if (pin3 !== "") {
              pin4Ref.current.focus();
            }
          }}
          style={[styles.inputText, { color: theme.txtColorPrimary }]}
          autoCorrect={false}
          {...props}
        />
      </View>

      {/* 4 */}

      <View
        style={[styles.textContainer, { borderColor: theme.otpInputColor }]}
      >
        <TextInput
          ref={pin4Ref}
          keyboardType="number-pad"
          maxLength={maxLen}
          onChange={(pin4) => {
            setPin1(pin4);
          }}
          style={[styles.inputText, { color: theme.txtColorPrimary }]}
          autoCorrect={false}
          {...props}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderBottomWidth: 1,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 18,
    paddingBottom: 5,
  },
  inputText: {
    fontSize: 30,
  },
});

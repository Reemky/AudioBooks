import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import themeContext from "../../config/themeContext";
import Icon from "react-native-vector-icons/Ionicons";

export default CustomInput = ({
  label,
  iconName,
  error,
  password,
  ...props
}) => {
  const theme = useContext(themeContext);
  const [hidePassowrd, setHidePassowrd] = useState(password);
  return (
    <View>
      <View
        style={[
          styles.textInput,
          { borderColor: error ? theme.errorColor : theme.inputColor, backgroundColor: theme.inputColor },
        ]}
      >
        <View style={{ flex: 1, flexDirection: "row", height: 45, }}>
          <Icon
            name={iconName}
            style={{ fontSize: 18, color: theme.prevScreenIconColor, marginRight: 8, alignSelf:'center' }}
          ></Icon>

          <TextInput
            secureTextEntry={hidePassowrd}
            autoCorrect={false}
            placeholderTextColor={theme.inputPlaceholder}
            
            {...props}
            style={{ marginRight: 190, width: "100%", color: theme.inputTxtColor }}
          />
        </View>
        {password && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setHidePassowrd(!hidePassowrd)}
          >
            <Icon
              style={{
                fontSize: 18,
                color: theme.iconColor,
                textAlign: "center",
                paddingRight: 8,
              }}
              name={hidePassowrd ? "eye-off-outline" : "eye-outline"}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          style={{
            fontSize: 13,
            color: theme.errorColor,
            fontStyle: "italic",
            marginLeft: 4,
            marginTop: 5,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textInput: {
    alignItems: "center",
    width: 350,
    height: 45,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#f3f3f3",
    marginTop: 25,
    flexDirection: "row",
  },
});

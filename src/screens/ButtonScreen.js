import { View, StyleSheet, Button } from "react-native";
import React from "react";
import RbButton from "../components/RbButton";

export default ButtonScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <RbButton
          label={"Start"}
          shape={"box"}
          borderType={"empty"}
          showLabel={false}
          icon={true}
          iconName={"bank"}
          iconPosition={"right"}
          iconSize={30}
        ></RbButton>
        <RbButton
          label={"Start"}
          shape={"circle"}
          disabled={true}
          icon={true}
          iconName={"bank"}
          iconPosition={"right"}
          showLabel={false}
        ></RbButton>

        <RbButton
          label={"Start"}
          icon={true}
          iconName={"bank"}
          iconPosition={"right"}
        ></RbButton>
        <RbButton
          label={"Stop"}
          disabled={true}
          icon={false}
          iconName={"bank"}
          height={80}
          width={80}
          iconPosition={"right"}
          iconSize={20}
        ></RbButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, StyleSheet, Animated, Dimensions } from "react-native";
import React, { useState, useContext } from "react";
import themeContext from "../../config/themeContext";

export default Paginator = ({ data, scrollX }) => {
  const { width } = Dimensions.get("window");
  const theme = useContext(themeContext);

  return (
    <View
      style={{ flexDirection: "row", height: 64, justifyContent: "center" }}
    >
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const indicatorWidth = scrollX.interpolate({
          inputRange,
          outputRange: [25, 45, 25],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.indicator, { width: indicatorWidth, opacity, backgroundColor: theme.paginatorColor }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 4,
    marginHorizontal: 5.5,
    borderRadius: 20,
  },
});

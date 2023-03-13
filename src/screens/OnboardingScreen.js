import React, { useRef, useState, useContext } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  Switch,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Paginator from "../components/Paginator";

import themeContext from "../../config/themeContext";
import { EventRegister } from "react-native-event-listeners";
import SwitchWithIcons from "react-native-switch-with-icons";
import lightMode from "../../assets/images/lightMode.png";
import darkMode from "../../assets/images/darkMode.png";
const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Discover Your Favourite Posdcats.",
    description: "Listen to your favourite authors.",
    image: require("../../assets/images/Onboarding4.gif"),
  },
  {
    id: 2,
    title: "Listen & Share Across The World.",
    description: "Anytime, Anywhere.",
    image: require("../../assets/images/Onboarding3.gif"),
  },
  {
    id: 3,
    title: "Inspire & Get Motivated.",
    description: "Start now!",
    image: require("../../assets/images/bulb1.gif"),
  },
];

const Slide = ({ item }) => {
  const theme = useContext(themeContext);

  return (
    <View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={[styles.title, { color: theme.txtColorPrimary }]}>
        {item.title}
      </Text>
      <Text style={[styles.description, { color: theme.txtColorPrimary }]}>
        {item.description}
      </Text>
    </View>
  );
};

export default function Onboardingscr({ navigation }) {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

  const { width, height } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const Back = () => {
    const previousSlideIndex = currentSlideIndex - 1;
    const offset = previousSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(previousSlideIndex);
  };

  return (
    <SafeAreaProvider
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <View
        style={{
          justifyContent: "center",
          top: -5,
        }}
      >
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          data={slides}
          contentContainerStyle={{ height: height * 0.9 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Slide item={item} />}
          bounces={false}
          pagingEnabled
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
      </View>

      <View style={{ top: -92 }}>
        <Paginator data={slides} scrollX={scrollX} />

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

      {/* Render buttons */}
      {currentSlideIndex == slides.length - 1 ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.btn,
              { backgroundColor: theme.btnColor, width: 350 },
            ]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[styles.btnText, { color: theme.btnTxtColor }]}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.btn,
              {
                backgroundColor:
                  currentSlideIndex == 0 ? theme.disabledBtn : theme.btnColor,
                borderWidth: currentSlideIndex == 0 ? 0 : 0.3,
              },
            ]}
            onPress={Back}
            disabled={currentSlideIndex == 0 ? true : false}
          >
            <Text
              style={[
                styles.btnText,
                {
                  color:
                    currentSlideIndex == 0
                      ? theme.disabledTxt
                      : theme.btnTxtColor,
                },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.btn, { backgroundColor: theme.btnColor }]}
            onPress={goToNextSlide}
          >
            <Text style={[styles.btnText, { color: theme.btnTxtColor }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    width: 160,
    height: 43,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 0.4,
    borderRadius: 12,
    justifyContent: "center",
    top: -80,
    marginHorizontal: 15,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 1,
  },
  image: {
    height: "70%",
    width: width,
    resizeMode: "contain",
    marginTop: 20,
  },
  title: {
    color: "#3d3b3a",
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: 0.5,
    width: 270,
    marginLeft: 40,
    alignSelf: "flex-start",
    top: -30,
  },
  description: {
    color: "#6f3ea6",
    fontSize: 17,
    fontWeight: 300,
    letterSpacing: 1,
    width: 190,
    marginLeft: 40,
    alignSelf: "flex-start",
    fontStyle: "italic",
    top: -21,
    letterSpacing: 1,
  },
});

import React from "react";
import { View, Image, StyleSheet, Animated, Easing } from "react-native";

const SplashScreen = () => {
  const imageScale = new Animated.Value(0);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: false,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image source={require("../assets/splash.png")} style={[styles.image, { transform: [{ scale: imageScale }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  image: {
    width: 1200,
    height: 1200,
  },
});

export default React.memo(SplashScreen);

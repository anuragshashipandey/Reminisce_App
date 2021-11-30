import React, { useCallback } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";

const icons = [];
const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default function About() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.thumbnail}
          source={require("../assets/AnuragPandey.png")}
        />
        <Text style={styles.heading}>
          I'm Anurag Shashi Pandey, am a fourth-year undergraduate student of
          the Department of Metallurgical and Materials Engineering at the
          Indian Institute of Technology, Kharagpur enrolled in its Dual
          Degree(B.Tech+M.Tech)
        </Text>
        <View style={styles.icon_container}>
          <OpenURLButton url="https://github.com/anuragshashipandey">
            <Image
              style={styles.icon}
              source={require(`../assets/github.png`)}
            />
          </OpenURLButton>
          <OpenURLButton url="https://www.facebook.com/anuragshashi.pandey">
            <Image
              style={styles.icon}
              source={require(`../assets/facebook.png`)}
            />
          </OpenURLButton>
          <OpenURLButton url="https://www.linkedin.com/in/anurag-shashi-pandey-77b9851b4/">
            <Image
              style={styles.icon}
              source={require(`../assets/linkedin.png`)}
            />
          </OpenURLButton>
          <OpenURLButton url="https://www.instagram.com/anuragshashipandey/">
            <Image
              style={styles.icon}
              source={require(`../assets/insta.png`)}
            />
          </OpenURLButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // textAlign: "center",
    margin: 2,
  },
  heading: {
    fontWeight: "bold",
    paddingTop: 5,
    textAlign: "center",
    borderWidth: 2,
    marginTop: 2,
    borderRadius: 15,
  },
  thumbnail: { height: 400, borderRadius: 15, width: "98%" },
  icon: {
    margin: 10,
    width: 40,
    height: 40,
  },
  icon_container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

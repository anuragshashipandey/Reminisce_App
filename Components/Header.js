import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
// import logo from "../assets/headericon.png";

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Image source={require("../assets/headericon.png")} />
        <Text style={styles.txt}>Reminisce</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 18,
  },
});
export default Header;

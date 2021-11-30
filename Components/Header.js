import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      {/* <Image source={logo} style={{ width: 35, height: 35 }} /> */}
      <View>
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

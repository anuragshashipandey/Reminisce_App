import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import * as RootNavigation from "../RootNavigation";

export default function () {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.btn}
        // onPress={() => {
        //   RootNavigation.navigate("Add");
        // }}
      >
        <Text>Add</Text>
      </TouchableOpacity>

      <View style={styles.lower}>
        <TouchableOpacity
          style={styles.btn}
          // onPress={() => {
          //   RootNavigation.navigate("Every");
          // }}
        >
          <Text>Every Reminisce...</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          // onPress={() => {
          //   RootNavigation.navigate("About");
          // }}
        >
          <Text>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 80,
    flexDirection: "column",
  },
  lower: {
    height: 40,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  btn: {
    padding: 15,
  },
});

import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import * as RootNavigation from "../RootNavigation";

export default function ({ location }) {
  return (
    <ImageBackground style={{ backgroundColor: "#5316af" }}>
      {/* <View style={styles.footer}> */}
      <View style={styles.lower}>
        <TouchableOpacity
          style={styles.btn_txt}
          onPress={() => {
            RootNavigation.navigate("Add", {
              location: location,
            });
          }}
        >
          <Text style={styles.btn_txt}>Add</Text>
        </TouchableOpacity>

        {/* <View style={styles.lower}> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            RootNavigation.navigate("AllReminies");
          }}
        >
          <Text style={styles.btn_txt}>Every Reminisce</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            RootNavigation.navigate("About");
          }}
        >
          <Text style={styles.btn_txt}>About</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  lower: {
    height: 40,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingBottom: 20,
    padding: 10,
  },
  add_btn: {
    padding: 15,
    textAlign: "center",
    alignItems: "center",
  },
  btn: {
    // padding: 20,
  },
  btn_txt: {
    color: "white",
    fontWeight: "500",
    // paddingLeft: 2,
  },
});

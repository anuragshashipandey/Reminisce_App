import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
function HomePage() {
  const [isempty, setisempty] = useState(true);
  const noMemory = `Things End but Reminisces Lasts forever...`;
  return (
    <View style={styles.container}>
      {isempty ? <Text>noMemory</Text> : <></>}
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

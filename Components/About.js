import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Anurag Shashi Pandey</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  heading: {
    fontWeight: "bold",
    paddingTop: 5,
  },
  text: {},
});

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Components/Header";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <Header />
        <Stack.Navigator initialRouteName="Reminisce" headerMode="screen">
          <Stack.Screen name="Reminisce" component={HomePage} />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

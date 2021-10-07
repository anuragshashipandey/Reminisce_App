import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Components/Header";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddReminise from "./Components/AddReminise";
import CameraCapture from "./Components/CameraCapture";
import * as Location from "expo-location";
const Stack = createStackNavigator();

export default function App() {
  const [currLocation, setCurrLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!currLocation)
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        // console.log(
        //   "loc",
        //   loc?.coords?.latitude.toPrecision(4),
        //   loc?.coords?.longitude.toPrecision(4)
        // );
        setCurrLocation([
          loc?.coords?.latitude.toPrecision(4),
          loc?.coords?.longitude.toPrecision(4),
        ]);
      })();
    console.log("lo", currLocation);
  });
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Reminisce"
          screenOptions={{
            headerMode: "screen",
            headerStyle: {
              backgroundColor: "#5316af",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Reminisce">
            {(props) => <HomePage {...props} location={currLocation} />}
          </Stack.Screen>
          <Stack.Screen name="Add" component={AddReminise} />
          <Stack.Screen name="Camera" component={CameraCapture} />
        </Stack.Navigator>
        <Footer location={currLocation} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

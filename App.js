import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet, BackHandler, Alert, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddReminise from "./Components/AddReminise";
import CameraCapture from "./Components/CameraCapture";
import * as Location from "expo-location";
import AllReminiese from "./Components/AllReminiese";
import About from "./Components/About";

const Stack = createStackNavigator();

export default function App() {
  let [currLocation, setCurrLocation] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const createTwoButtonAlert = () =>
    Alert.alert("Location Denied", "Give Permission for Location", [
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
        style: "cancel",
      },
      { text: "OK", onPress: () => getcurrlocation() },
    ]);
  const getcurrlocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      createTwoButtonAlert();
      return;
    }
    let loc = await Location.getLastKnownPositionAsync({});
    if (loc === null) {
      await Location.getCurrentPositionAsync({})
        .then((res) => {
          loc = res;
        })
        .catch((err) => {
          console.log(err);
          createTwoButtonAlert();
        });
    }
    currLocation = [
      loc?.coords?.latitude.toPrecision(4),
      loc?.coords?.longitude.toPrecision(4),
    ];

    setCurrLocation([...currLocation]);
  };
  useEffect(() => {
    getcurrlocation();
  }, []);
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Reminisce"
          screenOptions={{
            headerMode: "screen",
            headerStyle: {
              backgroundColor: "#FEFEFF",
              borderBottomWidth: 0,
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Reminisce">
            {(props) => (
              <HomePage {...props} location={currLocation} recentAdd={[]} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Add" component={AddReminise} />
          <Stack.Screen name="Camera" component={CameraCapture} />
          <Stack.Screen name="AllReminies" component={AllReminiese} />
          <Stack.Screen name="About" component={About} />
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

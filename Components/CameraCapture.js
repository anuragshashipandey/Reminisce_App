import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CameraCapture({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pic, setPic] = useState(null);
  const cam = useRef(null);
  const { setSelectedPicture } = route.params;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {/* {!pic ? ( */}
      <Camera style={styles.camera} type={type} ref={cam}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              let picture = await cam.current.takePictureAsync();
              const asset = await MediaLibrary.createAssetAsync(picture.uri);
              console.log(asset);
              setSelectedPicture(asset.uri);
              // if (picture) {
              //   setPic(picture);
              //   setSelectedPicture(picture);
              navigation.goBack();
              // }
              console.log(picture?.uri);
            }}
          >
            <Text style={styles.text}> Click </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {/* ) : (
        <Image style={styles.story_img} source={{ uri: pic?.uri }} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  button: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  story_img: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },
});

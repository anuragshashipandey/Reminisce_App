import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

function AddReminise({ route, navigation }) {
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Fields Missing",
      "Add an image and a Message to complete the memory",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );
  const { location } = route.params;

  const [msg, setMsg] = useState("");
  const [submit, setsubmit] = useState(false);
  const [selectedPic, setSelectedPicture] = useState("");
  const savedata = async () => {
    if (selectedPic === "" || msg === "") {
      createTwoButtonAlert();
    } else {
      try {
        let jsonvalue = await AsyncStorage.getItem(JSON.stringify(location));
        let value = [];
        value = JSON.parse(jsonvalue) || [];
        value = [[selectedPic, msg], ...value];
        jsonvalue = JSON.stringify(value);
        await AsyncStorage.setItem(JSON.stringify(location), jsonvalue);

        setsubmit(!submit);
        jsonvalue = await AsyncStorage.getItem("location");
        value = JSON.parse(jsonvalue) || [];
        value = [[...location], ...value];
        await AsyncStorage.setItem("location", JSON.stringify(value));
        navigation.navigate("Reminisce", {
          recentAdd: [selectedPic, msg],
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    setSelectedPicture(route.params.clickedPic);
  }, [route.params.clickedPic]);
  useEffect(() => {
    setSelectedPicture("");
    setMsg("");
  }, [submit]);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!!pickerResult) setSelectedPicture(pickerResult?.uri);
    else setSelectedPicture("");
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#4c669f", "#192f6a", "black"]}
        style={styles.background}
      >
        <View style={styles.img_btn}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("Camera", {
                location: location,
              });
            }}
          >
            <Text style={styles.btn_txt}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={openImagePickerAsync}>
            <Text style={styles.btn_txt}>Pick an image</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>
          Words make your memories more beautiful...
        </Text>
        <View style={styles.multi_input}>
          <TextInput
            style={styles.multi}
            value={msg}
            onChangeText={(text) => setMsg(text)}
            multiline
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={savedata}>
          <Text style={styles.btn_txt}>Make it forever</Text>
        </TouchableOpacity>
        {selectedPic === "" ? (
          <></>
        ) : (
          <View>
            <Image style={styles.story_img} source={{ uri: selectedPic }} />
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

export default AddReminise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  img_btn: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    paddingTop: 20,
    margin: 2,
    textAlign: "center",
  },
  multi: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 16,
    width: 300,
  },
  multi_input: {
    alignItems: "center",
  },
  story_img: {
    height: 300,
    width: 300,
    resizeMode: "contain",
    marginTop: 15,
  },

  btn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    padding: 2,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  btn_txt: {
    color: "black",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 700,
  },
});

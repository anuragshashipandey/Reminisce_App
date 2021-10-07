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
  console.log("location", location);
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
        if (!!jsonvalue) value = JSON.parse(jsonvalue);
        // console.log(msg);
        value = [...value, [selectedPic, msg]];
        jsonvalue = JSON.stringify(value);
        await AsyncStorage.setItem(JSON.stringify(location), jsonvalue);
        console.log({ value: value });
        setsubmit(!submit);
        jsonvalue = await AsyncStorage.getItem("location");
        value = JSON.parse(jsonvalue);
        value = [...value, [...location]];
        await AsyncStorage.setItem("location", JSON.stringify(value));
      } catch (err) {
        console.log(err);
      }
    }
  };
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
    console.log(pickerResult?.uri);
    if (!!pickerResult) setSelectedPicture(pickerResult?.uri);
    else setSelectedPicture("");
  };
  return (
    <View style={styles.container}>
      {selectedPic === "" ? (
        <></>
      ) : (
        <View>
          <Image style={styles.story_img} source={{ uri: selectedPic }} />
        </View>
      )}
      <View style={styles.img_btn}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Camera", {
              setSelectedPicture: setSelectedPicture,
            });
          }}
        >
          <Text style={styles.btn_txt}>Open Camera</Text>
        </TouchableOpacity>
        <Text style={styles.label}>or</Text>
        <TouchableOpacity style={styles.btn} onPress={openImagePickerAsync}>
          <Text style={styles.btn_txt}>Pick an image</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>
        Words make your memories more beautiful...
      </Text>
      <TextInput
        style={styles.multi}
        value={msg}
        onChangeText={(text) => setMsg(text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.btn} onPress={savedata}>
        <Text style={styles.btn_txt}>Make it forever</Text>
      </TouchableOpacity>
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
  story_img: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },

  btn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: "#5316af",
    borderRadius: 5,
    backgroundColor: "#5316af",
  },
  btn_txt: {
    color: "#fff",
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AllReminiese() {
  const [isempty, setIsEmpty] = useState(true);
  let [location, setLocation] = useState([]);
  let [items, setItems] = useState([]);

  const noMemory = `Things End but Reminisces Lasts forever...`;
  const getlocations = async () => {
    try {
      let tmp = await AsyncStorage.getItem("location");
      location = [...JSON.parse(tmp)];
      setLocation(location);
      console.log(location);
    } catch (err) {
      console.log("err", err);
    }
  };
  const getReminise = async (loc) => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem(JSON.stringify(loc)));
      setItems([...items, ...data]);
    } catch (err) {}
  };

  useEffect(() => {
    getlocations();
  }, []);
  useEffect(() => {
    location.map((x) => getReminise(x));
    console.log("items", items);
  }, [location]);
  useEffect(() => {
    if (items !== []) setIsEmpty(false);
  }, [items]);

  const listItem = ({ item }) => {
    return (
      <View style={styles.post}>
        <Text style={styles.title}>{item[1]}</Text>
        <Image style={styles.thumbnail} source={{ uri: item[0] }} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isempty ? (
        <Text style={styles.txt}>{noMemory}</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={listItem}
          keyExtractor={(item) => item[0]}
        />
      )}
    </View>
  );
}

export default AllReminiese;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    borderRadius: 15,
  },
  txt: {
    textAlign: "center",
    color: "black",
    fontSize: 50,
  },
  thumbnail: {
    height: 500,
    width: "98%",
    borderRadius: 15,
  },
  post: {
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    margin: 2,
    width: "98%",
    alignItems: "center",
  },
});

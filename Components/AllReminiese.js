import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

function AllReminiese() {
  const [isempty, setIsEmpty] = useState(true);
  let [location, setLocation] = useState([]);
  let [items, setItems] = useState([]);

  const noMemory = `Things End but Reminisces Lasts forever...`;
  const getlocations = async () => {
    try {
      let tmp = await AsyncStorage.getItem("location");
      if (tmp !== null) {
        location = [...JSON.parse(tmp)];
        setLocation(location);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const getReminise = async (loc) => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem(JSON.stringify(loc)));
      if (data !== null) {
        items = [...items, [...loc, "loc"], ...data];
        setItems([...items]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getlocations();
  }, []);
  useEffect(() => {
    location.map((x) => getReminise(x));
  }, [location]);
  useEffect(() => {
    if (items !== []) setIsEmpty(false);
  }, [items]);

  const listItem = ({ item }) => {
    return (
      <View>
        {item.length === 3 ? (
          <View style={styles.post}>
            <Text style={styles.title}>
              {item[0]} {item[1]}
            </Text>
            <Text style={styles.descrption}>
              Identify the place from the above Geo Co-ords!!
            </Text>
          </View>
        ) : (
          <View style={styles.post}>
            <Text style={styles.title}>{item[1]}</Text>
            <Image style={styles.thumbnail} source={{ uri: item[0] }} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#4c669f", "#192f6a", "black"]}
        style={styles.background}
      >
        {isempty ? (
          <Text style={styles.txt}>{noMemory}</Text>
        ) : (
          <FlatList
            data={items}
            renderItem={listItem}
            keyExtractor={(item) => item[0]}
          />
        )}
      </LinearGradient>
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
  descrption: {
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 15,
    textAlign: "center",
  },
  txt: {
    textAlign: "center",
    color: "#fff",
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
    margin: 2,
    width: "98%",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 700,
  },
});

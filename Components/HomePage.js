import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

function HomePage({ location, route }) {
  let [isempty, setIsEmpty] = useState(true);
  let [items, setItems] = useState([]);
  const noMemory = `Things End but Reminisces Lasts forever...`;
  const recentAdd = route.params?.recentAdd || [];
  const getReminise = async () => {
    try {
      const data = JSON.parse(
        await AsyncStorage.getItem(JSON.stringify(location))
      );

      items = [...data];
      setItems(items);
    } catch (err) {}
  };

  useEffect(() => {
    getReminise();
  }, [location, recentAdd]);
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
      <LinearGradient
        colors={["#fff", "#4c669f", "#192f6a", "black"]}
        style={styles.background}
      >
        {isempty ? (
          <Text style={styles.txt}>{noMemory}</Text>
        ) : (
          <View style={styles.header_container}>
            <Text style={styles.heading}>
              Reminisce at your current Geo-Coords...
            </Text>
            <FlatList
              data={items}
              renderItem={listItem}
              keyExtractor={(item) => item[0]}
            />
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: 30,
    color: "black",
    borderWidth: 2,
    fontWeight: "bold",
    borderColor: "#CDD4E4",
    borderRadius: 5,

    borderWidth: 0,
  },
  header_container: {
    flex: 1,
  },
  title: {
    padding: 5,
    fontSize: 30,
    fontWeight: "bold",
    borderRadius: 15,
    color: "#fff",
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
    margin: 2,
    marginBottom: 10,
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

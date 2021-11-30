import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomePage({ location }) {
  let [isempty, setIsEmpty] = useState(true);
  let [items, setItems] = useState([]);
  const noMemory = `Things End but Reminisces Lasts forever...`;

  const getReminise = async () => {
    try {
      // console.log("location", location);
      const data = JSON.parse(
        await AsyncStorage.getItem(JSON.stringify(location))
      );

      items = [...data];
      setItems(items);
    } catch (err) {}
  };

  useEffect(() => {
    getReminise();
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

export default HomePage;

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

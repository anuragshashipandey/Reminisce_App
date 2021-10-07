import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomePage({ location }) {
  const [isempty, setIsEmpty] = useState(true);
  const [items, setItems] = useState([]);
  // const location = route.params.location;

  const noMemory = `Things End but Reminisces Lasts forever...`;

  const getlocations = async () => {
    try {
      let tmp = await AsyncStorage.getItem("location");
    } catch (err) {
      console.log("err", err);
    }
  };
  const getReminise = async () => {
    try {
      const data = JSON.parse(
        await AsyncStorage.getItem(JSON.stringify(location))
      );
      setItems([...data]);
    } catch (err) {}
  };
  useEffect(() => {
    getReminise();
    if (!!items) {
      setIsEmpty(false);
    }
    console.log("items", items);
  }, []);

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    padding: 10,
  },
  txt: {
    color: "black",
  },
  thumbnail: {
    height: 200,
    width: "98%",
    // fontWeight: "bold",
  },
  post: {
    paddingTop: 15,
    paddingBottom: 25,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

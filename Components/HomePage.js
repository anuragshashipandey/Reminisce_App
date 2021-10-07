import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomePage({ location }) {
  const [isempty, setIsEmpty] = useState(true);
  const [items, setItems] = useState([]);
  const noMemory = `Things End but Reminisces Lasts forever...`;
  useEffect(() => {
    async () => {
      const data = JSON.parse(
        await AsyncStorage.getItem(JSON.stringify(location))
      );
      console.log("location", await AsyncStorage.getItem("location"));
      setItems([...data]);
      if (!!items) {
        setIsEmpty(false);
      }
    };
    // console.log(items);
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    padding: 10,
  },
  txt: {
    color: "white",
  },
  thumbnail: {
    height: 200,
    width: "98%",
    // fontWeight: "bold",
  },
});

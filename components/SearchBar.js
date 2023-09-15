import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon } from "../constants/icons";
import homeStore from "../store/homeStore";

export default function SearchBar() {
  const query = homeStore((state) => state.query);
  const setQuery = homeStore((state) => state.setQuery);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon color={"#cda540"} size={24} name={"search"} onPress={() => {}} />
      </TouchableOpacity>
      <TextInput style={styles.input} placeholderTextColor={"#cda540"} placeholder="Ara" value={query} onChangeText={setQuery} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#aaa",
    borderRadius: 25,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "90%",
    marginRight: 100,
    color: "#000",
  },
  iconContainer: {
    height: 40,
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 16,
  },
});

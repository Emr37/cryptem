import { View, StyleSheet, Text, TouchableOpacity, Button, Platform, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { globalStyles } from "../styles";
import { useToast } from "react-native-toast-notifications";
import Currencies from "../components/Currencies";
import homeStore from "../store/homeStore";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView, { Marker, Callout } from "react-native-maps";

const AllCoinsScreen = () => {
  // const toast = useToast();
  // const fetchCoins = homeStore((state) => state.fetchCoins);
  // const coins = homeStore((state) => state.coins);
  // const isLoading = homeStore((state) => state.isLoading);

  // const notify = () =>
  //   toast.show("Hello World", {
  //     duration: 3000,
  //   });

  // useEffect(() => {
  //   fetchCoins();
  // }, []);

  const initialRegion = {
    latitude: 41.01,
    longitude: 29.0,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <>
      <View style={globalStyles.container}>
        {/*isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList data={coins} style={{ width: "100%" }} renderItem={({ item }) => <Currencies data={item} />} keyExtractor={(item) => item.id} />
        )*/}

        <MapView style={styles.map} region={initialRegion}>
          <Marker coordinate={initialRegion} pinColor="#cda540" />
        </MapView>
      </View>
    </>
  );
};

export default AllCoinsScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "50%",
    borderRadius: 40,
  },
});

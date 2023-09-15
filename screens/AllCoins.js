import { View, Text, TouchableOpacity, Button, Platform, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { globalStyles } from "../styles";
import { useToast } from "react-native-toast-notifications";
import Currencies from "../components/Currencies";

import homeStore from "../store/homeStore";
import { SafeAreaView } from "react-native-safe-area-context";

const AllCoinsScreen = () => {
  const toast = useToast();
  const fetchCoins = homeStore((state) => state.fetchCoins);
  const coins = homeStore((state) => state.coins);
  const isLoading = homeStore((state) => state.isLoading);

  const notify = () =>
    toast.show("Hello World", {
      duration: 3000,
    });

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <>
      <View style={globalStyles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList data={coins} style={{ width: "100%" }} renderItem={({ item }) => <Currencies data={item} />} keyExtractor={(item) => item.id} />
        )}
      </View>
    </>
  );
};

export default AllCoinsScreen;

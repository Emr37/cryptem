import { View, Text, TouchableOpacity, Button, Platform, FlatList, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { globalStyles } from "../styles";
import Currencies from "../components/Currencies";

import homeStore from "../store/homeStore";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";

const MainScreen = () => {
  const { fetchCoins, coins, isLoading, fetchBtcUsd } = homeStore();

  useEffect(() => {
    fetchCoins();
    alert("EAS update alındı mı? Alınmadı mı?");
  }, []);

  useEffect(() => {
    fetchBtcUsd();
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator style={globalStyles.loading} color={"#cda540"} size={"large"} />
      ) : (
        <>
          <View style={[globalStyles.container, {}]}>
            <SearchBar />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={coins}
              style={{ width: "100%" }}
              renderItem={({ item }) => <Currencies data={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </>
      )}
    </>
  );
};

export default MainScreen;

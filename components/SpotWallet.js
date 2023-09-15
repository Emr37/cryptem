import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const SpotWallet = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContianer}>
        <Image style={styles.icon} source={{ uri: data.image }} />
      </View>
      <View style={styles.title}>
        <Text style={styles.symbol}>Miktarı </Text>
      </View>

      <View style={styles.exchange}>
        <Text style={styles.price}>Adeti</Text>
      </View>
    </View>
  );
};

export default SpotWallet;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  iconContianer: {
    width: 52,
    height: 52,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    overflow: "hidden",
  },

  icon: {
    width: 52,
    height: 52,
  },
  title: {
    flex: 1,
    justifyContent: "center",
    width: 50,
  },
  symbol: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
  },
  exchange: {
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "300",
  },
});

import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles";
import { formatDate, formatTime } from "../utils/timeFormatter";
import * as Location from "expo-location";
import { useEffect, useState, useMemo } from "react";

const MapCard = ({ data }) => {
  const [address, setAddress] = useState(null);

  const reverseGeocode = async () => {
    const response = await Location.reverseGeocodeAsync({
      latitude: Number(data?.latitude),
      longitude: Number(data?.longtude),
    });

    setAddress({
      city: response[0].city,
      region: response[0].region,
      district: response[0].district,
      street: response[0].street,
      subregion: response[0].subregion,
      date: formatDate(data.created),
      time: formatTime(data.created),
    });
    console.log(response[0]);
  };

  useEffect(() => {
    reverseGeocode();
    console.log("MapCard-Address", address);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* {address === null && (
          <View style={styles.loading}>
            <ActivityIndicator color={"#cda540"} size={"small"} />
          </View>
        )} */}
        <View style={[styles.box, { flexDirection: "column", flexWrap: "no-wrap" }]}>
          <Text style={styles.text}>{address?.street}</Text>
          <Text style={styles.text}>{address?.district}</Text>
        </View>
        <View style={[styles.box, { flexDirection: "column", flexWrap: "no-wrap" }]}>
          <Text style={styles.text}>{address?.city || address?.subregion}</Text>
          <Text style={styles.text}>{address?.region}</Text>
        </View>
        <View style={[styles.box, { flexDirection: "column", flexWrap: "no-wrap" }]}>
          <Text style={styles.text}>{address?.date}</Text>
          <Text style={styles.text}>{address?.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default MapCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  card: {
    width: "100%",
    height: 100,
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 12,
    padding: 8,
    backgroundColor: "#181a20",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#eee",
    fontSize: 14,
    textAlign: "center",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

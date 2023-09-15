import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { globalStyles } from "../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import authStore from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import SpotWallet from "../components/SpotWallet";
import { db } from "../service/firebase";
import { doc, getDoc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const WalletScreen = () => {
  const navigation = useNavigation();
  const { logout } = authStore();
  const loading = authStore((state) => state.isLoading);
  const [user, setUser] = useState({});
  const [currency, setCurrency] = useState([]);

  console.log(currency);
  //console.log(Object.keys(currency.spots[0]));
  //console.log(Object.values(currency.spots[0]));

  // Read Data ////////////////////////////////////////
  const getSpots = async () => {
    const newUserRef = doc(db, "users", user?.uid);

    const docSnap = await getDoc(newUserRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let data = docSnap.data();
      setCurrency(data.spots);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // onSnapshot(doc(db, "users", user.uid), (doc) => {
  //   console.log("Current data: ", doc.data());
  //   let data = doc.data();
  //   setCurrency(data.spots);
  // });

  useFocusEffect(
    useCallback(() => {
      getSpots();
    }, [])
  );

  // Write Data //////////////////////////////////////

  const denemeUsd = async () => {
    const newUserRef = doc(db, "users", user.uid);

    await setDoc(newUserRef, {
      spots: [{ usd: 1000 }],
    });
  };

  ////////////////////////////////////////////////////////
  const getUser = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  ////////////////////////////////////////////////////////
  return (
    <>
      <View style={styles.container}>
        {loading && !user && <ActivityIndicator style={styles.loading} color={"#cda540"} size={"large"} />}

        <View style={styles.profileBox}>
          <View style={styles.avatar}>
            <Ionicons name={"person-circle"} size={72} color={"#000"} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.text}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={() => logout(navigation)}>
            <Ionicons name={"power"} size={36} color={"#000"} />
          </TouchableOpacity>
        </View>
        <Text>Hello</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => denemeUsd()}>
            <Text style={styles.buttonText}>1000 USD Al</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          {currency &&
            currency.map((item, index) => {
              return (
                <View key={index} style={styles.chart}>
                  <Text style={styles.time}>{Object.keys(item)}</Text>
                  <Text style={styles.price}>{Object.values(item)}</Text>
                </View>
              );
            })}
        </View>

        {/*<View style={styles.spotContainer}>
          <FlatList data={spots} style={{ width: "100%" }} renderItem={({ item }) => <SpotWallet data={item} />} keyExtractor={(item) => item.id} />
  </View>*/}
      </View>
    </>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
  },

  buttonContainer: {
    width: "40%",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  profileBox: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    margin: 8,
    padding: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    elevation: 8,
  },
  avatar: {
    height: 76,
    width: 76,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    width: "100%",
    marginBottom: 24,
    alignItems: "flex-start",
  },
  chart: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#aaa",
    width: "40%",
  },
  time: {
    marginLeft: 4,
    marginRight: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
});

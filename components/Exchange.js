import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import detailStore from "../store/detailStore";
import { db } from "../service/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

const Exchange = () => {
  const { lastPrice } = detailStore();
  const [user, setUser] = useState({});
  const [currency, setCurrency] = useState([]);
  const [updatedUsd, setUpdatedUsd] = useState();
  const [amount, setAmount] = useState("");

  const toast = useToast();

  const buy = () => {
    const total = lastPrice * Number(amount);

    result = currency[0].usd - total;
    setUpdatedUsd(result);

    toast.show(`${amount} miktar coininiz başarıyla alınmıştır. Kalan bakiyeniz ${updatedUsd} USD`, {
      type: "success",
      placement: "top",
      duration: 5000,
      animationType: "zoom-in",
    });

    setAmount("");

    updateCurrencies(result);
  };

  const sell = (amount) => {
    let total = lastPrice * amount;
  };

  const updateCurrencies = async (newAmount) => {
    const newUserRef = doc(db, "users", user.uid);

    await updateDoc(newUserRef, {
      spots: [{ usd: newAmount }],
    });
  };

  const getSpots = async () => {
    const newUserRef = doc(db, "users", user?.uid);

    const docSnap = await getDoc(newUserRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let data = docSnap.data();
      setCurrency(data.spots);

      let index = currency.findIndex((item) => {
        return Object.keys(item) == "usd";
      });

      console.log("index", index);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getSpots();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getSpots();
    }, [])
  );

  //////////////////////////////////////////////
  const getUser = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  ////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <Text>Şimdiki Değeri: {lastPrice} </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => buy()}>
          <Text style={styles.buttonText}>Alış</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#FF6464" }]} onPress={() => sell()}>
          <Text style={styles.buttonText}>Satış</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Bir Miktar Giriniz" onChangeText={(text) => setAmount(text)} value={amount} style={styles.input} keyboardType={"numeric"} />
      </View>
    </View>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },

  button: {
    height: 50,
    width: 100,
    backgroundColor: "#38E54D",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
  inputContainer: {
    width: 150,
    height: 40,
    marginTop: 16,
    borderColor: "#eee",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 8,
    paddingBottom: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 32,
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 8,
    width: "100%",
    textAlign: "center",
  },
});

import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import detailStore from "../store/detailStore";
import { globalStyles } from "../styles";
import { LineChart } from "react-native-chart-kit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import authStore from "../store/authStore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import Exchange from "../components/Exchange";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const DetailScreen = ({ route }) => {
  const { symbol, id, name } = route.params;
  const { fetchData, isLoading, priceAndTime } = detailStore();
  const { auth } = authStore();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchData(id);
  }, []);

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
    <>
      {isLoading && priceAndTime && <ActivityIndicator style={styles.loading} color={"#cda540"} size={"large"} />}
      <KeyboardAwareScrollView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container, { justifyContent: "flex-start", alignItems: "center" }]}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.chartContainer}>
              {priceAndTime.map((item) => {
                return (
                  <View key={uuidv4()} style={styles.chart}>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                );
              })}
            </View>
            {auth.currentUser ? (
              <Exchange />
            ) : (
              <>
                <TouchableOpacity>
                  <Text>Oturum Aç</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#eee",
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#cda540",
  },
  chartContainer: {
    width: "100%",
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#cda540",
    width: "90%",
  },
  time: {
    marginLeft: 16,
    marginRight: 80,
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
});

{
  /* <LineChart
                  data={{
    labels: times,
    datasets: [
      {
        data: prices,
      },
    ],
  };}
                  width={width * 0.95}
                  height={250}
                  verticalLabelRotation={300}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: "#000",
                    backgroundGradientFrom: "#000",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "3",
                      strokeWidth: "2",
                      stroke: "#ffa726",
                    },
                  }}
                  style={styles.chart}
                /> */
}

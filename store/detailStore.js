import axios from "axios";
import { Alert } from "react-native";
import { create } from "zustand";

const detailStore = create((set) => ({
  prices: [],
  times: [],
  priceAndTime: [],
  isLoading: true,
  days: 7,
  lastPrice: undefined,

  fetchData: async (id) => {
    const { days } = detailStore.getState();
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
      //console.log(response);
      const arr = await response.data.prices;
      let lastIndex = arr.length - 1; // 168
      let theNumber = lastIndex / days; // 24
      let newArr = [];
      for (let i = days; i >= 0; i--) {
        newArr.push(arr[lastIndex - theNumber * i]);
      }

      const priceAndTime = newArr.map((item) => {
        return {
          time: new Date(item[0]).toLocaleDateString("tr-TR"),
          price: item[1].toFixed(10),
        };
      });

      const prices = newArr.map((item) => {
        return item[1];
      });

      const times = newArr.map((item) => {
        //console.log("last part", new Date(item[0]).toLocaleDateString("tr-TR"));

        return new Date(item[0]).toLocaleDateString("tr-TR");
      });

      const lastPrice = newArr[newArr.length - 1][1].toFixed(10);

      set({ prices, times, priceAndTime, lastPrice });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default detailStore;

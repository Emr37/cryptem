import axios from "axios";
import { create } from "zustand";

const allCoinsStore = create((set) => ({
  coins: [],
  isLoading: true,

  fetchCoins: async () => {
    const response = await axios.get("https://api.coingecko.com/api/v3/search/trending").finally(() => {
      set({ isLoading: false });
    });

    const coins = response.data.coins.map((coin) => {
      return {
        id: coin.item.id,
        name: coin.item.name,
        symbol: coin.item.symbol,
        image: coin.item.small,
        priceBtc: coin.item.price_btc,
      };
    });
    set({ coins });
  },
}));

export default allCoinsStore;

import axios from "axios";
import { create } from "zustand";

const homeStore = create((set) => ({
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
    //console.log(response.data.coins);
    set({ coins });
  },
}));

export default homeStore;

//https://api.coingecko.com/api/v3/simple/price?ids=verge&vs_currencies=try&include_24hr_change=true&include_last_updated_at=true

//https://api.coingecko.com/api/v3/coins/list?include_platform=false

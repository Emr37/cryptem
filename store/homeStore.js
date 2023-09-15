import axios from "axios";
import { create } from "zustand";
import debounce from "../utils/debounce";

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  isLoading: true,
  query: "",
  btcUsd: 0,

  fetchBtcUsd: async () => {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
    set({ btcUsd: response.data.bitcoin.usd });
  },

  setQuery: (text) => {
    set({ query: text });
    homeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    const { query, trending } = homeStore.getState();

    if (query?.length > 2) {
      const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`).finally(() => {
        set({ isLoading: false });
      });
      console.log(response.data);
      const coins = response.data.coins.map((coin) => {
        return {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.thumb,
        };
      });
      console.log(coins);

      set({ coins });
    } else {
      set({ coins: trending });
    }
  }, 800),

  fetchCoins: async () => {
    const { btcUsd } = homeStore.getState();

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
        priceUsd: (coin.item.price_btc * btcUsd).toFixed(10),
      };
    });
    set({ coins, trending: coins });
  },
}));

export default homeStore;

//https://api.coingecko.com/api/v3/simple/price?ids=verge&vs_currencies=try&include_24hr_change=true&include_last_updated_at=true

//https://api.coingecko.com/api/v3/coins/list?include_platform=false

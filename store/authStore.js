import { create } from "zustand";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "../service/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const authStore = create((set) => ({
  auth: auth,
  user: {},
  isLoading: true,

  login: async (data) => {
    const { auth } = authStore.getState();
    set({ isLoading: false });

    console.log(data);
    await signInWithEmailAndPassword(auth, data.email, data.password);
    try {
      (userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        console.log("Oturum açtı: ", user.email);

        set({ user });
      };
    } catch (err) {
      Alert.alert(err.message);
    } finally {
    }
  },

  register: async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password);

    try {
      (userCredentials) => {
        const user = userCredentials.user;

        console.log("Kayıt oldu: ", user);

        set({ user });
        set({ isLoading: false });
      };
    } catch (err) {
      Alert.alert(err.message);
    } finally {
    }
  },

  logout: async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("user");
    set({ user: {} });
    //navigation.navigate("Wallet");
  },
}));

export default authStore;

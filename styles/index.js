import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 100,
    backgroundColor: "#eee",
    width: "100%",
    marginBottom: 10,
    borderRadius: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  text: {
    color: "#000",
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
});

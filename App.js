import RootNavigation from "./navigation/root";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <>
      <ToastProvider>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
      </ToastProvider>
    </>
  );
}

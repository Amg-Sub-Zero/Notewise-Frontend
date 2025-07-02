import { useColorScheme } from "react-native";

const lightTheme = {
  mode: "light",
  background: "#fff",
  text: "#222",
  border: "#ccc",
  primary: "#3f66fb",
  secondary: "#efeaf3",
  inputBackground: "#f8f9fa",
  inputText: "#222",
  tabBar: "#fff",
  tabBarBorder: "#eee",
};

const darkTheme = {
  mode: "dark",
  background: "#181a20",
  text: "#f8f8f8",
  border: "#333",
  primary: "#3f66fb",
  secondary: "#23232b",
  inputBackground: "#23232b",
  inputText: "#f8f8f8",
  tabBar: "#23232b",
  tabBarBorder: "#222",
};

export function useTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
}

export { lightTheme, darkTheme };

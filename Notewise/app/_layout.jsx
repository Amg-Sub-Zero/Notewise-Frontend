import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { StatusBar } from "react-native";

export default function RootLayout() {
  // Mock user data - replace with actual user data later
  const userName = "Jobless Billionaire";
  const userInitial = userName.charAt(0).toUpperCase();
  const profileColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
  ];
  const randomColor =
    profileColors[Math.floor(Math.random() * profileColors.length)];

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 1,
                marginTop: 18,
                height: 35,
                justifyContent: "center",
              }}
            >
              <Ionicons name="document-text" size={35} color="#333" />
              <Text style={{ fontWeight: "70", fontSize: 30, color: "#333" }}>
                Notewise
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 19, marginTop: 18 }}>
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 20,
                  backgroundColor: randomColor,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {userInitial}
                </Text>
              </View>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#f8f9fa",
            height: 50,
            borderBottomWidth: 0,
          },
          headerTitleContainerStyle: {
            alignItems: "center",
          },
        }}
      />
    </>
  );
}

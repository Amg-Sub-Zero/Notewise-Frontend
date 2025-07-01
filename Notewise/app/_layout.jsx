import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { StatusBar } from "react-native";
import React, { useState } from "react";
import AccountSwitcher from "./AccountSwitcher";

export default function RootLayout() {
  // Mock user data - replace with actual user data later
  const [accounts, setAccounts] = useState([
    { name: "Jobless Billionaire", email: "jobless@example.com" },
  ]);
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const getInitial = (name) => name.charAt(0).toUpperCase();
  const profileColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
  ];
  const getColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return profileColors[Math.abs(hash) % profileColors.length];
  };

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
            <TouchableOpacity
              style={{ marginRight: 19, marginTop: 18 }}
              onPress={() => setModalVisible(true)}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 20,
                  backgroundColor: getColor(currentAccount.name),
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
                  {getInitial(currentAccount.name)}
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
      <AccountSwitcher
        accounts={accounts}
        setAccounts={setAccounts}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}

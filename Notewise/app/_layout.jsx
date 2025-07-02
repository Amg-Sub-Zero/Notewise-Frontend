import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <StatusBar style="dark" />
      {/* Custom Header Tab */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 12,
          paddingTop: 4,
          paddingBottom: 4,
          minHeight: 44,
          backgroundColor: "#f8f9fa",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="document-text" size={35} color="#333" />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 30,
              color: "#333",
              marginLeft: 8,
            }}
          >
            Notewise
          </Text>
        </View>
        <TouchableOpacity style={{}} onPress={() => setModalVisible(true)}>
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
      </View>
      {/* Main Content (Stack) */}
      <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
      <AccountSwitcher
        accounts={accounts}
        setAccounts={setAccounts}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

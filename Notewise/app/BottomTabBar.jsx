import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./theme";

export default function BottomTabBar({ activeTab = "chat", onTabPress }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.tabBar,
        { backgroundColor: theme.tabBar, borderTopColor: theme.tabBarBorder },
      ]}
    >
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.("source")}
      >
        <Ionicons
          name={activeTab === "source" ? "folder" : "folder-outline"}
          size={28}
          color={
            activeTab === "source"
              ? theme.mode === "dark"
                ? "#fff"
                : "#333"
              : theme.mode === "dark"
              ? "#666"
              : "#333"
          }
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color:
                theme.mode === "dark"
                  ? "#fff"
                  : activeTab === "source"
                  ? "#333"
                  : "#333",
            },
          ]}
        >
          Source
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.("chat")}
      >
        <Ionicons
          name={
            activeTab === "chat"
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline"
          }
          size={34}
          color={
            activeTab === "chat"
              ? theme.mode === "dark"
                ? "#fff"
                : "#333"
              : theme.mode === "dark"
              ? "#666"
              : "#333"
          }
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color:
                theme.mode === "dark"
                  ? "#fff"
                  : activeTab === "chat"
                  ? "#333"
                  : "#333",
            },
          ]}
        >
          Chat
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.("studio")}
      >
        <Ionicons
          name={activeTab === "studio" ? "easel" : "easel-outline"}
          size={28}
          color={
            activeTab === "studio"
              ? theme.mode === "dark"
                ? "#fff"
                : "#333"
              : theme.mode === "dark"
              ? "#666"
              : "#333"
          }
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color:
                theme.mode === "dark"
                  ? "#fff"
                  : activeTab === "studio"
                  ? "#333"
                  : "#333",
            },
          ]}
        >
          Studio
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 12,
    borderTopWidth: 1,
    marginBottom: 50,
    gap: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
    textAlign: "center",
  },
});

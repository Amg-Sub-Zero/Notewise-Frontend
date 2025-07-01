import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomTabBar({ activeTab = "chat", onTabPress }) {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.("source")}
      >
        <Ionicons
          name="folder-outline"
          size={28}
          color={activeTab === "source" ? "#3f66fb" : "#888"}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: activeTab === "source" ? "#3f66fb" : "#888" },
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
          name="chatbubble-ellipses-outline"
          size={34}
          color={activeTab === "chat" ? "#3f66fb" : "#888"}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: activeTab === "chat" ? "#3f66fb" : "#888" },
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
          name="easel-outline"
          size={28}
          color={activeTab === "studio" ? "#3f66fb" : "#888"}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: activeTab === "studio" ? "#3f66fb" : "#888" },
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
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 40,
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

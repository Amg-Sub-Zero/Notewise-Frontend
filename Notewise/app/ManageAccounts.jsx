import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./theme";

const profileColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
];

const getInitial = (name) => name.charAt(0).toUpperCase();
const getColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return profileColors[Math.abs(hash) % profileColors.length];
};

export default function ManageAccounts({
  accounts,
  setAccounts,
  currentAccount,
  setCurrentAccount,
  visible,
  setVisible,
}) {
  const theme = useTheme();
  if (!visible) return null;

  return (
    <>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <Pressable
            onPress={() => setVisible(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={theme.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Manage accounts
          </Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Accounts List */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Current Account First */}
          <View style={styles.accountItem}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: getColor(currentAccount.name) },
              ]}
            >
              <Text
                style={[
                  styles.avatarText,
                  { color: theme.mode === "dark" ? "#181a20" : "#fff" },
                ]}
              >
                {getInitial(currentAccount.name)}
              </Text>
            </View>
            <View style={styles.accountInfo}>
              <Text style={[styles.accountName, { color: theme.text }]}>
                {currentAccount.name}
              </Text>
              <Text style={[styles.accountEmail, { color: theme.text }]}>
                {currentAccount.email}
              </Text>
            </View>
            <View
              style={[styles.currentBadge, { backgroundColor: theme.primary }]}
            >
              <Text
                style={[styles.currentBadgeText, { color: theme.background }]}
              >
                Current
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Other Accounts */}
          {accounts
            .filter((account) => account.email !== currentAccount.email)
            .map((account, index) => (
              <React.Fragment key={account.email}>
                <Pressable
                  style={styles.accountItem}
                  onPress={() => {
                    setCurrentAccount(account);
                    setVisible(false);
                  }}
                >
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: getColor(account.name) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.avatarText,
                        { color: theme.mode === "dark" ? "#181a20" : "#fff" },
                      ]}
                    >
                      {getInitial(account.name)}
                    </Text>
                  </View>
                  <View style={styles.accountInfo}>
                    <Text style={[styles.accountName, { color: theme.text }]}>
                      {account.name}
                    </Text>
                    <Text style={[styles.accountEmail, { color: theme.text }]}>
                      {account.email}
                    </Text>
                  </View>
                </Pressable>
                {index <
                  accounts.filter((a) => a.email !== currentAccount.email)
                    .length -
                    1 && (
                  <View
                    style={[styles.divider, { backgroundColor: theme.border }]}
                  />
                )}
              </React.Fragment>
            ))}

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Add Another Account */}
          <Pressable
            style={styles.addAccountItem}
            onPress={() => {
              setAccounts([
                ...accounts,
                {
                  name: "New User",
                  email: `newuser${accounts.length}@example.com`,
                },
              ]);
            }}
          >
            <Ionicons
              name="person-add-outline"
              size={22}
              color={theme.text}
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.addAccountText, { color: theme.text }]}>
              Add another account
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  accountEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  currentBadge: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  addAccountItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  addAccountText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

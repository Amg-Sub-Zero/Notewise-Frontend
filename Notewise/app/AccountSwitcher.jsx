import React, { useState } from "react";
import {
  Modal,
  FlatList,
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ManageAccounts from "./ManageAccounts";

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

export default function AccountSwitcher({
  accounts,
  setAccounts,
  currentAccount,
  setCurrentAccount,
  modalVisible,
  setModalVisible,
}) {
  const [manageAccountsVisible, setManageAccountsVisible] = useState(false);

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 0,
              }}
            >
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{ padding: 4, marginRight: 8, marginBottom: 10 }}
                hitSlop={8}
              >
                <Ionicons name="close" size={24} color="#333" />
              </Pressable>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.modalTitle}>Switch Account</Text>
              </View>
              <View style={{ width: 32 }} />
            </View>
            <View style={styles.currentAccountContainer}>
              <View
                style={[
                  styles.currentAvatar,
                  { backgroundColor: getColor(currentAccount.name) },
                ]}
              >
                <Text style={styles.currentAvatarText}>
                  {getInitial(currentAccount.name)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.currentAccountName}>
                  {currentAccount.name}
                </Text>
                <Text style={styles.currentAccountEmail}>
                  {currentAccount.email}
                </Text>
                <Text style={styles.currentLabel}>Current account</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.manageAccountBtn}>
              <Text style={styles.manageAccountText}>
                Manage your Google Account
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <FlatList
              data={accounts
                .filter((a) => a.email !== currentAccount.email)
                .slice(0, 2)}
              keyExtractor={(item) => item.email}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.accountItem}
                  onPress={() => {
                    setCurrentAccount(item);
                    setModalVisible(false);
                  }}
                >
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: getColor(item.name) },
                    ]}
                  >
                    <Text style={styles.avatarText}>
                      {getInitial(item.name)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.accountName}>{item.name}</Text>
                    <Text style={styles.accountEmail}>{item.email}</Text>
                  </View>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.addAccountInline}
              onPress={() => {
                // For demo, just add a mock account
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
                color="#333"
                style={{ marginRight: 12 }}
              />
              <View>
                <Text style={styles.accountName}>Add another account</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.manageAccountsRow}
              onPress={() => {
                setManageAccountsVisible(true);
                setModalVisible(false);
              }}
            >
              <Ionicons
                name="person-circle-outline"
                size={22}
                color="#333"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.accountName}>Manage accounts</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable
              style={styles.upgradeRow}
              onPress={() => {
                console.log("Upgrade to Pro pressed");
                // Add your upgrade logic here
              }}
            >
              <Ionicons
                name="document-text"
                size={22}
                color="#333"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.accountName}>Upgrade to Pro</Text>
            </Pressable>
            <Pressable
              style={styles.licenseRow}
              onPress={() => {
                console.log("Show open source licenses pressed");
                // Add your licenses logic here
              }}
            >
              <Ionicons
                name="ribbon-outline"
                size={22}
                color="#333"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.accountName}>Show open source licenses</Text>
            </Pressable>
            <Pressable
              style={styles.feedbackRow}
              onPress={() => {
                console.log("Feedback pressed");
                // Add your feedback logic here
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={22}
                color="#333"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.accountName}>Feedback</Text>
            </Pressable>
            <View style={styles.divider} />
          </View>
        </View>
      </Modal>
      <ManageAccounts
        accounts={accounts}
        setAccounts={setAccounts}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        visible={manageAccountsVisible}
        setVisible={setManageAccountsVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "stretch",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  currentAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 5,
  },
  currentAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    position: "relative",
  },
  currentAvatarText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    zIndex: 1,
  },
  currentAccountName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  currentAccountEmail: {
    fontSize: 14,
    color: "#888",
  },
  currentLabel: {
    fontSize: 12,
    color: "#1976d2",
    marginTop: 2,
    fontWeight: "bold",
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 4,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountName: {
    fontSize: 16,
    fontWeight: "500",
  },
  accountEmail: {
    fontSize: 13,
    color: "#888",
  },
  addAccountInline: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 4,
  },
  manageAccountBtn: {
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  manageAccountText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 15,
  },
  manageAccountsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 4,
  },
  upgradeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 4,
  },
  licenseRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 4,
  },
  feedbackRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 4,
  },
});

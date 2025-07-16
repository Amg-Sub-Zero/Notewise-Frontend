import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./theme";

export default function SourceListScreen({
  sources,
  onSourcePress,
  onAddSource,
  onBack,
  title,
  onRenameSource,
  onDeleteSource,
}) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [renameModalVisible, setRenameModalVisible] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={[styles.headerTitle, { color: theme.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title || (sources && sources[0]?.title) || "Source"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={{ padding: 4 }}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setMenuVisible(false)}>
          <View
            style={{
              position: "absolute",
              top: 60,
              right: 20,
              backgroundColor: theme.background,
              borderRadius: 8,
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              paddingVertical: 8,
              minWidth: 160,
            }}
          >
            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => {
                setMenuVisible(false); /* handle rename */
                setRenameModalVisible(true);
                setNewName("");
              }}
            >
              <Text style={{ color: theme.text, fontSize: 16 }}>
                Rename Notebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => {
                setMenuVisible(false); /* handle delete */
                setDeleteModalVisible(true);
              }}
            >
              <Text style={{ color: "red", fontSize: 16 }}>
                Delete Notebook
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      {/* Rename Modal */}
      <Modal
        visible={renameModalVisible}
        transparent
        animationType="none"
        onRequestClose={() => setRenameModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={60}
        >
          <View
            style={{
              width: 300,
              backgroundColor: theme.background,
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
              elevation: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 16,
                color: theme.text,
              }}
            >
              Edit Name
            </Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter new name"
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: theme.primary,
                borderRadius: 8,
                padding: 10,
                marginBottom: 20,
                color: theme.text,
              }}
              placeholderTextColor={theme.text}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  alignItems: "center",
                  borderRadius: 8,
                  backgroundColor:
                    theme.mode === "dark" ? theme.background : "#eee",
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: theme.mode === "dark" ? "#fff" : "#3f66fb",
                }}
                onPress={() => setRenameModalVisible(false)}
              >
                <Text style={{ color: theme.text }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  alignItems: "center",
                  borderRadius: 8,
                  backgroundColor: theme.primary,
                  marginLeft: 8,
                }}
                onPress={() => {
                  if (newName.trim()) {
                    // Find the source to rename (use the first source in the list if only one is shown)
                    const targetId =
                      sources && sources.length === 1 ? sources[0].id : null;
                    if (targetId) {
                      onRenameSource(targetId, newName.trim());
                    }
                    setRenameModalVisible(false);
                  }
                }}
              >
                <Text style={{ color: "#fff" }}>Rename</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* Delete Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="none"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={60}
        >
          <View
            style={{
              width: 300,
              backgroundColor: theme.background,
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
              elevation: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 16,
                color: theme.text,
              }}
            >
              Delete Notebook
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.text,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Remove this notebook and its all contents
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  alignItems: "center",
                  borderRadius: 8,
                  backgroundColor:
                    theme.mode === "dark" ? theme.background : "#eee",
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: theme.mode === "dark" ? "#fff" : "#3f66fb",
                }}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={{ color: theme.text }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  alignItems: "center",
                  borderRadius: 8,
                  backgroundColor: theme.primary,
                  marginLeft: 8,
                }}
                onPress={() => {
                  // Find the source to delete (use the first source in the list if only one is shown)
                  const targetId =
                    sources && sources.length === 1 ? sources[0].id : null;
                  if (targetId) {
                    onDeleteSource(targetId);
                  }
                  setDeleteModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1, alignItems: "center", paddingTop: 0 }}>
          <View style={{ width: "100%", marginBottom: 20 }}>
            {sources.length === 0 && (
              <Text
                style={{
                  color: theme.text,
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 40,
                }}
              >
                No sources available.
              </Text>
            )}
            {sources.map((source) => (
              <TouchableOpacity
                key={source.id}
                onPress={() => onSourcePress?.(source)}
                style={{
                  paddingVertical: 15,
                  marginBottom: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: theme.text,
                    marginBottom: 5,
                  }}
                >
                  {source.title}
                </Text>
                <Text style={{ fontSize: 14, color: theme.text }}>
                  {source.addedDate ? `Added ${source.addedDate}` : ""}
                  {source.details ? ` • ${source.details}` : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* Floating Add Source Button */}
      <View style={styles.addBtnContainer}>
        <TouchableOpacity
          style={[
            styles.addBtn,
            {
              backgroundColor: theme.mode === "dark" ? "#fff" : "#333",
            },
          ]}
          onPress={onAddSource}
        >
          <Text
            style={[
              styles.addBtnText,
              {
                color: theme.mode === "dark" ? "#000" : "#fff",
              },
            ]}
          >
            + Add Source
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backBtn: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: "normal",
  },
  addBtnContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  addBtn: {
    paddingVertical: 17,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

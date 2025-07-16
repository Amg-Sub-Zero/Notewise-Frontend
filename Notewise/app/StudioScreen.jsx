import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./theme";

export default function StudioScreen({
  source,
  onBack,
  onGenerateAudio,
  onRenameSource,
  onDeleteSource,
}) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [renameModalVisible, setRenameModalVisible] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
            {source?.title || "Studio"}
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
                    onRenameSource(source.id, newName.trim());
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
                  onDeleteSource(source.id);
                  setDeleteModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Centered Title and Generate Audio Button */}
      <View style={styles.centerArea}>
        <AudioWaveformIcon color={theme.primary} />
        {source?.title && (
          <>
            <Text style={[styles.centerTitle, { color: theme.text }]}>
              {source.title}
            </Text>
            <Text style={[styles.centerMeta, { color: theme.text }]}>
              {getSourceMeta(source)}
            </Text>
          </>
        )}
        <TouchableOpacity
          style={[styles.generateBtn, { backgroundColor: "#3f66fb" }]}
          onPress={onGenerateAudio}
        >
          <Text style={[styles.generateBtnText, { color: "#fff" }]}>
            Generate Audio
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AudioWaveformIcon({ color = "#1976d2" }) {
  // Larger SVG-like waveform using Views
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: 28,
      }}
    >
      <View
        style={{
          width: 6,
          height: 32,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 48,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 26,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 58,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 38,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 20,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 48,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
    </View>
  );
}

function getSourceMeta(source) {
  if (!source) return "";
  // For now, always '1 source'.
  let meta = "1 source";
  // Check if latest (addedDate is today or 'latest' flag)
  if (
    source.addedDate &&
    (source.addedDate.toLowerCase().includes("today") ||
      source.addedDate.toLowerCase().includes("latest"))
  ) {
    meta += " · latest";
  }
  return meta;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  headerType: {
    fontSize: 13,
    marginTop: 2,
  },
  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  generateBtn: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  generateBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centerTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 24,
    textAlign: "center",
  },
  centerMeta: {
    fontSize: 13,
    marginBottom: 24,
    textAlign: "center",
  },
});

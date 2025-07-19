import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Clipboard,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "./BottomTabBar";
import SourceListScreen from "./SourceListScreen";
import StudioScreen from "./StudioScreen";
import { useRouter, useNavigation } from "expo-router";
import { useTheme } from "./theme";

export default function ChatScreen({
  source,
  onBack,
  sources = [],
  onSourcePress,
  onAddSource,
  onRenameSource,
  onDeleteSource,
}) {
  const [messages, setMessages] = useState(
    source
      ? [
          {
            id: 1,
            text: source.title,
            sender: "app",
            type: "source",
          },
        ]
      : []
  );
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [inputFocused, setInputFocused] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const theme = useTheme();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); // Replace with your main/home route if different
    }
  };

  const handleLike = (messageId, isLike) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          // If clicking the same button that's already active, set to neutral (null)
          if (msg.liked === isLike) {
            return { ...msg, liked: null };
          }
          // Otherwise, set to the new state
          return { ...msg, liked: isLike };
        }
        return msg;
      })
    );
  };

  const handleCopy = async (text) => {
    try {
      await Clipboard.setString(text);
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: input, sender: "user" },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: (current[current.length - 1]?.id || 0) + 1,
          text: "Hey Amg Sub Zero",
          sender: "app",
          liked: null,
        },
      ]);
    }, 500);
  };

  useEffect(() => {
    if (source) {
      setMessages([
        {
          id: 1,
          text: source.title,
          sender: "app",
          type: "source",
        },
      ]);
    }
  }, [source]);

  // Prepare FlatList data with audio overview after source
  const getChatData = () => {
    if (!messages.length) return [];
    const data = [...messages];
    // Find the source message
    const sourceIndex = data.findIndex(
      (msg) => msg.type === "source" && msg.sender === "app"
    );
    if (sourceIndex !== -1) {
      // Insert audio overview after the source message
      data.splice(sourceIndex + 1, 0, {
        type: "audio-overview",
        id: "audio-overview",
      });
    }
    return data;
  };

  const handleAudioOverview = () => {
    setActiveTab("studio");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {activeTab === "source" ? (
        <SourceListScreen
          sources={source ? [source] : []}
          onSourcePress={onSourcePress}
          onAddSource={onAddSource}
          onBack={onBack}
          title={source?.title}
          onRenameSource={onRenameSource}
          onDeleteSource={onDeleteSource}
        />
      ) : activeTab === "studio" ? (
        <StudioScreen
          source={source}
          onBack={onBack}
          onGenerateAudio={() => {}}
        />
      ) : (
        <>
          {/* Header */}
          <View
            style={[
              styles.header,
              { borderBottomColor: theme.mode === "dark" ? "#333" : "#eee" },
            ]}
          >
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={[styles.headerTitle, { color: theme.text }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {source?.title || "Source"}
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
            <Pressable
              style={{ flex: 1 }}
              onPress={() => setMenuVisible(false)}
            >
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

          {/* Chat Messages */}
          <FlatList
            data={getChatData()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              if (item.type === "audio-overview") {
                return (
                  <View style={styles.audioOverviewContainer}>
                    <TouchableOpacity
                      style={[
                        styles.audioOverviewButton,
                        {
                          backgroundColor:
                            theme.mode === "dark" ? "#666" : "#f8f9fa",
                          borderColor: theme.mode === "dark" ? "#333" : "#ccc",
                        },
                      ]}
                      onPress={handleAudioOverview}
                    >
                      <View style={styles.audioWaveform}>
                        <View style={[styles.waveformBar, { height: 8 }]} />
                        <View style={[styles.waveformBar, { height: 12 }]} />
                        <View style={[styles.waveformBar, { height: 6 }]} />
                        <View style={[styles.waveformBar, { height: 14 }]} />
                        <View style={[styles.waveformBar, { height: 10 }]} />
                        <View style={[styles.waveformBar, { height: 4 }]} />
                        <View style={[styles.waveformBar, { height: 12 }]} />
                      </View>
                      <Text
                        style={[
                          styles.audioOverviewText,
                          { color: theme.mode === "dark" ? "#fff" : "#333" },
                        ]}
                      >
                        Audio Overview
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
              // Add marginTop if previous item is audio-overview and this is a user message
              let extraStyle = {};
              if (
                item.sender === "user" &&
                index > 0 &&
                getChatData()[index - 1]?.type === "audio-overview"
              ) {
                extraStyle.marginTop = 30;
              }
              return item.sender === "app" ? (
                <View style={{ marginBottom: 10, ...extraStyle }}>
                  <Text
                    style={[
                      styles.messageText,
                      {
                        textAlign: "left",
                        backgroundColor: "transparent",
                        color: theme.text,
                      },
                    ]}
                  >
                    {item.text}
                  </Text>
                  {/* Action buttons for app messages */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPress={() => handleCopy(item.text)}
                      style={styles.actionButton}
                    >
                      <Ionicons name="copy-outline" size={16} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleLike(item.id, true)}
                      style={[
                        styles.actionButton,
                        item.liked === true && styles.actionButtonActive,
                      ]}
                    >
                      <Ionicons
                        name={
                          item.liked === true
                            ? "thumbs-up"
                            : "thumbs-up-outline"
                        }
                        size={16}
                        color={item.liked === true ? "#3f66fb" : "#666"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleLike(item.id, false)}
                      style={[
                        styles.actionButton,
                        item.liked === false && styles.actionButtonActive,
                      ]}
                    >
                      <Ionicons
                        name={
                          item.liked === false
                            ? "thumbs-down"
                            : "thumbs-down-outline"
                        }
                        size={16}
                        color={item.liked === false ? "#ff6b6b" : "#666"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={[
                    {
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginBottom: 10,
                    },
                    extraStyle,
                  ]}
                >
                  <View
                    style={[
                      {
                        backgroundColor: "#efeaf3",
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 4,
                        maxWidth: "80%",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.07,
                        shadowRadius: 2,
                        elevation: 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        {
                          textAlign: "right",
                          backgroundColor: "transparent",
                          color: theme.mode === "dark" ? "#000" : theme.text,
                        },
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              );
            }}
            contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          />

          {/* Input Area */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          >
            <View
              style={[styles.inputArea, { backgroundColor: theme.background }]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                  marginHorizontal: 8,
                }}
              >
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackground,
                      color: theme.inputText,
                      borderColor: theme.border,
                      paddingRight: 40,
                      minHeight: 40,
                      maxHeight: 120,
                      textAlignVertical: "top",
                    },
                  ]}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Ask 1 source"
                  placeholderTextColor={theme.text}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  multiline={true}
                />
                <TouchableOpacity
                  onPress={sendMessage}
                  style={{
                    position: "absolute",
                    right: 8,
                    bottom: 8,
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name={inputFocused ? "send" : "document-outline"}
                    size={22}
                    color={inputFocused ? "#1976d2" : "#333"}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#888",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Notewise can be inaccurate, so double-check.
            </Text>
          </KeyboardAvoidingView>
        </>
      )}
      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
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
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: "normal",
    color: "#333",
  },
  headerType: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sendBtn: {
    padding: 8,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 15,
  },
  actionButton: {
    padding: 4,
    borderRadius: 4,
  },
  actionButtonActive: {
    backgroundColor: "#f0f0f0",
  },
  audioOverviewContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioOverviewButton: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 80,
    backgroundColor: "#f8f9fa",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    minWidth: 200,
  },
  audioWaveform: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  waveformBar: {
    width: 1.5,
    backgroundColor: "#3f66fb",
    marginHorizontal: 1,
  },
  audioOverviewText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});

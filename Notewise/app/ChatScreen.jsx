import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "./BottomTabBar";
import SourceListScreen from "./SourceListScreen";

export default function ChatScreen({
  source,
  onBack,
  sources = [],
  onSourcePress,
  onAddSource,
}) {
  const [messages, setMessages] = useState(
    source
      ? [
          {
            id: 1,
            text: source.title,
            sender: "source",
          },
        ]
      : []
  );
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: input, sender: "user" },
    ]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      {activeTab === "source" ? (
        <SourceListScreen
          sources={source ? [source] : []}
          onSourcePress={onSourcePress}
          onAddSource={onAddSource}
          onBack={onBack}
          title={source?.title}
        />
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.headerTitle}>
                {source?.title || "Source"}
              </Text>
              {source?.type && (
                <Text style={styles.headerType}>{source.type}</Text>
              )}
            </View>
            <View style={{ width: 24 }} />
          </View>

          {/* Chat Messages */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={
                  item.sender === "user"
                    ? styles.userMessage
                    : styles.sourceMessage
                }
              >
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          />

          {/* Input Area */}
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Ionicons name="send" size={22} color="#1976d2" />
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </KeyboardAvoidingView>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerType: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  sourceMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f3ff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#e3f3e9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
    marginRight: 8,
  },
  sendBtn: {
    padding: 8,
  },
});

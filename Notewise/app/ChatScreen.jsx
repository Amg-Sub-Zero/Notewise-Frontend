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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "./BottomTabBar";
import SourceListScreen from "./SourceListScreen";
import StudioScreen from "./StudioScreen";
import { useRouter, useNavigation } from "expo-router";

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
          {
            id: 2,
            text: "Hey Amg Sub Zero",
            sender: "app",
          },
        ]
      : []
  );
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [inputFocused, setInputFocused] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); // Replace with your main/home route if different
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
          sender: "source",
        },
        {
          id: 2,
          text: "Hey Amg Sub Zero",
          sender: "app",
        },
      ]);
    }
  }, [source]);

  return (
    <View style={styles.container}>
      {activeTab === "source" ? (
        <SourceListScreen
          sources={source ? [source] : []}
          onSourcePress={onSourcePress}
          onAddSource={onAddSource}
          onBack={onBack}
          title={source?.title}
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
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
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
                style={[
                  {
                    flexDirection: "row",
                    justifyContent:
                      item.sender === "user" || item.sender === "source"
                        ? "flex-end"
                        : "flex-start",
                    marginBottom: 10,
                  },
                ]}
              >
                <View
                  style={[
                    {
                      backgroundColor:
                        item.sender === "user" || item.sender === "source"
                          ? "#e3f3e9"
                          : "#efeaf3",
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      borderBottomLeftRadius:
                        item.sender === "user" || item.sender === "source"
                          ? 16
                          : 4,
                      borderBottomRightRadius:
                        item.sender === "user" || item.sender === "source"
                          ? 4
                          : 16,
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
                        textAlign:
                          item.sender === "user" || item.sender === "source"
                            ? "right"
                            : "left",
                        backgroundColor: "transparent",
                      },
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            )}
            contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          />

          {/* Input Area */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          >
            <View style={styles.inputArea}>
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
                  style={[styles.input, { paddingRight: 40 }]}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Ask 1 source"
                  placeholderTextColor="#666"
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                />
                <TouchableOpacity
                  onPress={sendMessage}
                  style={{
                    position: "absolute",
                    right: 8,
                    top: 0,
                    bottom: 0,
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
    fontSize: 20,
    fontWeight: "bold",
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
});

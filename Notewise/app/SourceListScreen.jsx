import React, { useState, useRef } from "react";
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
  Animated,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./theme";
import * as DocumentPicker from "expo-document-picker";
import YouTubeScreen from "./youtube";
import WebsiteScreen from "./website";
import CopiedTextScreen from "./copied-text";

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
  const [menuVisible, setMenuVisible] = useState(false);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Add source modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("main");
  const [showLoading, setShowLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setIsModalVisible(true);
    setIsBackgroundVisible(true);
    setCurrentScreen("main");
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
      setIsBackgroundVisible(false);
      setCurrentScreen("main");
    });
  };

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const goBackToMain = () => {
    setCurrentScreen("main");
  };

  const pickPDF = async () => {
    console.log("pickPDF called");
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });
      console.log("DocumentPicker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log("PDF selected successfully");
        const pdfFile = result.assets[0];

        // Close modal first
        setIsModalVisible(false);
        setIsBackgroundVisible(false);
        setCurrentScreen("main");

        // Wait a bit for modal to close, then proceed
        setTimeout(() => {
          console.log("Starting PDF processing");
          setShowLoading(true);

          setTimeout(() => {
            console.log("Creating PDF source");
            setShowLoading(false);
            const pdfSource = {
              title: pdfFile.name,
              type: "PDF",
              details: "PDF file",
              backgroundColor: "#e3f3e9",
              id: Date.now(),
              addedDate: "today",
            };
            console.log("PDF source created:", pdfSource);
            onAddSource(pdfSource);
          }, 1200);
        }, 500);
      } else {
        console.log("DocumentPicker cancelled or failed");
      }
    } catch (error) {
      console.error("Error in pickPDF:", error);
    }
  };

  // Handler for all add source flows
  const handleAddSource = (source) => {
    setIsModalVisible(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      onAddSource({
        ...source,
        id: Date.now(),
        addedDate: "today",
      });
    }, 1200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {showLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            backgroundColor:
              theme.mode === "dark" ? "#181a20" : "rgba(255,255,255,0.85)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#3f66fb" />
        </View>
      )}
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
          onPress={openModal}
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

      {/* Add Source Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: isBackgroundVisible
              ? theme.mode === "dark"
                ? "rgba(24, 26, 32, 0.7)"
                : "rgba(0, 0, 0, 0.3)"
              : "transparent",
            justifyContent: "flex-end",
          }}
        >
          <Animated.View
            style={{
              backgroundColor: theme.background,
              padding: 20,
              paddingTop: 30,
              paddingBottom: 40,
              height: "74%",
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            }}
          >
            {/* Close Button */}
            <TouchableOpacity
              onPress={closeModal}
              style={{
                position: "absolute",
                top: 5,
                right: 10,
                zIndex: 10,
                padding: 5,
              }}
            >
              <Text style={{ fontSize: 35, color: theme.text }}>×</Text>
            </TouchableOpacity>

            {/* Main Screen */}
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: theme.background,
                padding: 20,
                paddingTop: 30,
                paddingBottom: 40,
                zIndex: currentScreen === "main" ? 2 : 1,
              }}
            >
              {/* Header */}
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 30,
                  paddingTop: 30,
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor:
                      theme.mode === "dark" ? "#fff" : theme.secondary,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 15,
                  }}
                >
                  <Ionicons
                    name="duplicate-outline"
                    size={26}
                    color={theme.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  Add Source
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 16,
                  color: theme.text,
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                Sources let Notewise base its responses on the information that
                matters most to you.
              </Text>

              {/* Create options */}
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: theme.inputBackground,
                  borderRadius: 24,
                  marginBottom: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.mode === "dark" ? "#fff" : theme.primary,
                }}
                onPress={pickPDF}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: theme.mode === "dark" ? "#fff" : theme.primary,
                  }}
                >
                  PDF
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: theme.inputBackground,
                  borderRadius: 24,
                  marginBottom: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.mode === "dark" ? "#fff" : theme.primary,
                }}
                onPress={() => navigateToScreen("website")}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: theme.mode === "dark" ? "#fff" : theme.primary,
                  }}
                >
                  Website
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: theme.inputBackground,
                  borderRadius: 24,
                  marginBottom: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.mode === "dark" ? "#fff" : theme.primary,
                }}
                onPress={() => navigateToScreen("youtube")}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: theme.mode === "dark" ? "#fff" : theme.primary,
                  }}
                >
                  YouTube
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: theme.inputBackground,
                  borderRadius: 24,
                  marginBottom: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.mode === "dark" ? "#fff" : theme.primary,
                }}
                onPress={() => navigateToScreen("copied-text")}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: theme.mode === "dark" ? "#fff" : theme.primary,
                  }}
                >
                  Copied text
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* YouTube Screen */}
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#fff",
                zIndex: currentScreen === "youtube" ? 2 : 1,
              }}
            >
              <YouTubeScreen
                onBack={goBackToMain}
                onAddSource={handleAddSource}
              />
            </Animated.View>

            {/* Website Screen */}
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#fff",
                zIndex: currentScreen === "website" ? 2 : 1,
              }}
            >
              <WebsiteScreen
                onBack={goBackToMain}
                onAddSource={handleAddSource}
              />
            </Animated.View>

            {/* Copied Text Screen */}
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#fff",
                zIndex: currentScreen === "copied-text" ? 2 : 1,
              }}
            >
              <CopiedTextScreen
                onBack={goBackToMain}
                onAddSource={handleAddSource}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Modal>
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

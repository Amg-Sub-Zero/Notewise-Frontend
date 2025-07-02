import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import YouTubeScreen from "./youtube";
import WebsiteScreen from "./website";
import CopiedTextScreen from "./copied-text";
import * as DocumentPicker from "expo-document-picker";
import ChatScreen from "./ChatScreen";

export default function Index() {
  const [activeTab, setActiveTab] = useState("Recent");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("main"); // "main", "youtube", "website", "copied-text"
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [showChat, setShowChat] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [chatAnim] = useState(new Animated.Value(0));
  const [sources, setSources] = useState([
    {
      id: 1,
      title: "Research Paper.pdf",
      type: "PDF",
      addedDate: "2 days ago",
      details: "15 pages",
      backgroundColor: "#e3f3e9",
      isShared: false,
    },
    {
      id: 2,
      title: "Wikipedia Article",
      type: "Website",
      addedDate: "1 week ago",
      details: "Web content",
      backgroundColor: "#efeaf3",
      isShared: true,
    },
    {
      id: 3,
      title: "YouTube Tutorial",
      type: "YouTube",
      addedDate: "3 days ago",
      details: "12:45 duration",
      backgroundColor: "#e3f3e9",
      isShared: false,
    },
  ]);

  const tabs = ["Recent", "Shared", "Title", "Downloaded"];

  // Filter sources based on active tab
  const getFilteredSources = () => {
    switch (activeTab) {
      case "Shared":
        return sources.filter((source) => source.isShared);
      case "Recent":
        return sources; // Show all sources for now
      case "Title":
        return sources.sort((a, b) => a.title.localeCompare(b.title));
      case "Downloaded":
        return sources.filter((source) => source.type === "PDF"); // Assuming PDFs are downloaded
      default:
        return sources;
    }
  };

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
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.type === "success") {
      // Open chat screen with PDF as source
      setIsModalVisible(false);
      setTimeout(() => {
        setSelectedSource({
          title: result.name,
          type: "PDF",
          details: "PDF file",
          backgroundColor: "#e3f3e9",
        });
        setShowChat(true);
      }, 300);
    }
  };

  // Handler for all add source flows
  const handleAddSource = (source) => {
    setIsModalVisible(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setSources((prev) => [
        {
          ...source,
          id: Date.now(),
          addedDate: "today",
        },
        ...prev,
      ]);
      setSelectedSource({
        ...source,
        id: Date.now(),
        addedDate: "today",
      });
      setShowChat(true);
    }, 1200);
  };

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: 10,
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 9,
        marginHorizontal: 5,
        borderRadius: 22,
        backgroundColor: isActive ? "#eee" : "transparent",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: isActive ? "bold" : "normal",
          color: isActive ? "#333" : "#666",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (showChat) {
      Animated.timing(chatAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(chatAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showChat]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {showLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            backgroundColor: "rgba(255,255,255,0.85)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#3f66fb" />
        </View>
      )}
      <Modal
        visible={showChat && !!selectedSource}
        animationType={Platform.OS === "ios" ? "none" : "none"}
        transparent={false}
        onRequestClose={() => setShowChat(false)}
      >
        {showChat && selectedSource && (
          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  translateX: chatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0], // 500 px from right
                  }),
                },
              ],
            }}
          >
            <ChatScreen
              source={selectedSource}
              onBack={() => setShowChat(false)}
            />
          </Animated.View>
        )}
      </Modal>
      {!showChat && (
        <>
          {/* Tab Navigation */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 16,
              backgroundColor: "#f8f9fa",
              marginTop: 0,
            }}
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab}
                title={tab}
                isActive={activeTab === tab}
                onPress={() => setActiveTab(tab)}
              />
            ))}
          </View>

          {/* Content Area */}
          <ScrollView style={{ flex: 1, padding: 16 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 0,
              }}
            >
              {/* Sources Added Views */}
              <View style={{ width: "100%", marginBottom: 20 }}>
                {getFilteredSources().map((source) => (
                  <TouchableOpacity
                    key={source.id}
                    onPress={() => {
                      setSelectedSource(source);
                      setShowChat(true);
                    }}
                    style={{
                      backgroundColor: source.backgroundColor,
                      padding: 15,
                      borderRadius: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: 5,
                      }}
                    >
                      {source.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#666" }}>
                      Added {source.addedDate} • {source.details}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Create New Button */}
          <View
            style={{
              position: "absolute",
              bottom: 55,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                paddingVertical: 17,
                paddingHorizontal: 30,
                borderRadius: 30,
              }}
              onPress={openModal}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "50" }}>
                + Create New
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal */}
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
                  ? "rgba(0, 0, 0, 0.3)"
                  : "transparent",
                justifyContent: "flex-end",
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: "#fff",
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
                  <Text style={{ fontSize: 35, color: "#666" }}>×</Text>
                </TouchableOpacity>

                {/* Main Screen */}
                <Animated.View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#fff",
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
                        backgroundColor: "#f1f3ff",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 15,
                      }}
                    >
                      <Ionicons
                        name="duplicate-outline"
                        size={26}
                        color={"#3f66fb"}
                      />
                    </View>
                    <Text
                      style={{ fontSize: 23, fontWeight: "5", color: "#333" }}
                    >
                      Add Source
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 16,
                      color: "#666",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Sources let Notewise base its responses on the information
                    that matters most to you.
                  </Text>

                  {/* Create options */}
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: "#f8f9fa",
                      borderRadius: 24,
                      marginBottom: 10,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "blue",
                    }}
                    onPress={pickPDF}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "45", color: "blue" }}
                    >
                      PDF
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: "#f8f9fa",
                      borderRadius: 24,
                      marginBottom: 10,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "blue",
                    }}
                    onPress={() => navigateToScreen("website")}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "45", color: "blue" }}
                    >
                      Website
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: "#f8f9fa",
                      borderRadius: 24,
                      marginBottom: 10,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "blue",
                    }}
                    onPress={() => navigateToScreen("youtube")}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "45", color: "blue" }}
                    >
                      YouTube
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: "#f8f9fa",
                      borderRadius: 24,
                      marginBottom: 10,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "blue",
                    }}
                    onPress={() => navigateToScreen("copied-text")}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "45", color: "blue" }}
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
        </>
      )}
    </SafeAreaView>
  );
}

import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [activeTab, setActiveTab] = useState("Recent");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const tabs = ["Recent", "Shared", "Title", "Downloaded"];

  const openModal = () => {
    setIsModalVisible(true);
    setIsBackgroundVisible(true);
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
    });
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
            {/* First Source View */}
            <View
              style={{
                backgroundColor: "#e3f3e9",
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
                Research Paper.pdf
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>
                Added 2 days ago • 15 pages
              </Text>
            </View>

            {/* Second Source View */}
            <View
              style={{
                backgroundColor: "#efeaf3",
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
                Wikipedia Article
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>
                Added 1 week ago • Web content
              </Text>
            </View>

            {/* Third Source View */}
            <View
              style={{
                backgroundColor: "#e3f3e9",
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
                YouTube Tutorial
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>
                Added 3 days ago • 12:45 duration
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            Active Tab: {activeTab}
          </Text>
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
            backgroundColor: "#007AFF",
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

                padding: 5,
              }}
            >
              <Text style={{ fontSize: 35, color: "#666" }}>×</Text>
            </TouchableOpacity>

            {/* Header */}
            <View style={{ alignItems: "center", marginBottom: 30 }}>
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
              <Text style={{ fontSize: 23, fontWeight: "5", color: "#333" }}>
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
              Sources let Notewise base its responses on the information that
              matters most to you.
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
            >
              <Text style={{ fontSize: 16, fontWeight: "45", color: "blue" }}>
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
            >
              <Text style={{ fontSize: 16, fontWeight: "45", color: "blue" }}>
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
            >
              <Text style={{ fontSize: 16, fontWeight: "45", color: "blue" }}>
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
            >
              <Text style={{ fontSize: 16, fontWeight: "45", color: "blue" }}>
                Copied text
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

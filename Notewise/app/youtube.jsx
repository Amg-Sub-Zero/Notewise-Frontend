import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function YouTubeScreen({ onBack }) {
  const [url, setUrl] = useState("");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          alignItems: "center",
          padding: 20,
          paddingTop: 30,
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={onBack}
          style={{
            position: "absolute",
            left: 0,
            top: 20,
            marginLeft: 12,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#f1f3ff",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name="logo-youtube" size={20} color="#3f66fb" />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
          YouTube URL
        </Text>
      </View>

      {/* Content */}
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#000",
            marginBottom: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Paste in a YouTube URL below to upload as a source in Notewise.
        </Text>

        {/* URL Input */}
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 17,
              padding: 12,
              fontSize: 16,
              backgroundColor: "#f9f9f9",
            }}
            placeholder="Paste URL"
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text
          style={{
            fontSize: 13,
            color: "#000",
            marginBottom: 20,
            lineHeight: 20,
            fontWeight: "bold",
            backgroundColor: "#fff",
          }}
        >
          Note{"\n"}• Only the text transcript will be imported at this moment.
          {"\n"}• Only public YouTube videos are supported.{"\n"}• Recently
          uploaded videos may not be available to import
        </Text>

        {/* Add Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#3f66fb",
            paddingVertical: 17,
            paddingHorizontal: 20,
            borderRadius: 26,
            alignItems: "center",
            marginTop: 128,
            alignSelf: "center",
            width: 238,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

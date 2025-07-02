import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./theme";

export default function YouTubeScreen({ onBack, onAddSource }) {
  const [url, setUrl] = useState("");
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
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
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: theme.mode === "dark" ? "#fff" : theme.secondary,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name="logo-youtube" size={20} color={theme.primary} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
          YouTube URL
        </Text>
      </View>

      {/* Content */}
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 14,
            color: theme.text,
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
              borderColor: theme.primary,
              borderRadius: 17,
              padding: 12,
              fontSize: 16,
              backgroundColor: theme.inputBackground,
              color: theme.inputText,
            }}
            placeholder="Paste URL"
            placeholderTextColor={theme.text}
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text
          style={{
            fontSize: 13,
            color: theme.text,
            marginBottom: 20,
            lineHeight: 20,
            fontWeight: "bold",
            backgroundColor: theme.background,
          }}
        >
          Note{"\n"}• Only the text transcript will be imported at this moment.
          {"\n"}• Only public YouTube videos are supported.{"\n"}• Recently
          uploaded videos may not be available to import
        </Text>

        {/* Add Button */}
        <TouchableOpacity
          style={{
            backgroundColor: theme.primary,
            paddingVertical: 17,
            paddingHorizontal: 20,
            borderRadius: 26,
            alignItems: "center",
            marginTop: 128,
            alignSelf: "center",
            width: 238,
          }}
          onPress={() => {
            if (url.trim() && onAddSource) {
              onAddSource({
                title: url.trim(),
                type: "YouTube",
                details: "",
                backgroundColor: theme.secondary,
              });
              setUrl("");
            }
          }}
        >
          <Text
            style={{
              color: theme.background,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

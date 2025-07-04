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

export default function WebsiteScreen({ onBack, onAddSource }) {
  const [url, setUrl] = useState("");
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header */}
      <View
        style={{
          paddingTop: 30,
          alignItems: "center",
          padding: 20,
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
          <Ionicons name="globe" size={20} color={theme.primary} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
          Website URL
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
          Paste a Web URL below to upload as a source in Notewise.
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
            fontSize: 12,
            color: theme.text,
            marginBottom: 20,
            lineHeight: 20,
            fontWeight: "bold",
          }}
        >
          Note{"\n"}• This visible text on the website will be imported at this
          moment.{"\n"}• Paid articles are not supported.
        </Text>

        {/* Add Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#3f66fb",
            paddingVertical: 17,
            paddingHorizontal: 20,
            borderRadius: 26,
            alignItems: "center",
            marginTop: 148,
            alignSelf: "center",
            width: 238,
          }}
          onPress={() => {
            if (url.trim() && onAddSource) {
              onAddSource({
                title: url.trim(),
                type: "Website",
                details: "",
                backgroundColor: "#efeaf3",
              });
              setUrl("");
            }
          }}
        >
          <Text
            style={{
              color: "#fff",
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

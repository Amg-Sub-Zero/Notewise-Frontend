import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function CopiedTextScreen({ onBack, onAddSource }) {
  const [text, setText] = useState("");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
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
          <Ionicons name="clipboard" size={20} color="#3f66fb" />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
          Paste Copied Text
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
          Paste your copied text below to upload as a source in Notwise.
        </Text>

        {/* Text Input */}
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 17,
              padding: 12,
              fontSize: 16,
              backgroundColor: "#f9f9f9",
              textAlignVertical: "top",
            }}
            placeholder="Paste your text here..."
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={6}
          />
        </View>

        {/* Add Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#3f66fb",
            paddingVertical: 17,
            paddingHorizontal: 20,
            borderRadius: 26,
            alignItems: "center",
            marginTop: 220,
            alignSelf: "center",
            width: 238,
          }}
          onPress={() => {
            if (text.trim() && onAddSource) {
              onAddSource({
                title: text.trim(),
                type: "Copied Text",
                details: "",
                backgroundColor: "#f1f3ff",
              });
              setText("");
            }
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

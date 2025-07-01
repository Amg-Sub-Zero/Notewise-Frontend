import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SourceListScreen({
  sources,
  onSourcePress,
  onAddSource,
  onBack,
  title,
}) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>
            {title || (sources && sources[0]?.title) || "Source"}
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1, alignItems: "center", paddingTop: 0 }}>
          <View style={{ width: "100%", marginBottom: 20 }}>
            {sources.length === 0 && (
              <Text
                style={{
                  color: "#888",
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
                    color: "#333",
                    marginBottom: 5,
                  }}
                >
                  {source.title}
                </Text>
                <Text style={{ fontSize: 14, color: "#666" }}>
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
        <TouchableOpacity style={styles.addBtn} onPress={onAddSource}>
          <Text style={styles.addBtnText}>+ Add Source</Text>
        </TouchableOpacity>
      </View>
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
  addBtnContainer: {
    position: "absolute",
    bottom: 55,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 17,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

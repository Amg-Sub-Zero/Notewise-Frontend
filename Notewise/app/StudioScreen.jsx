import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StudioScreen({ source, onBack, onGenerateAudio }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>{source?.title || "Studio"}</Text>
          {source?.type && <Text style={styles.headerType}>{source.type}</Text>}
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Centered Title and Generate Audio Button */}
      <View style={styles.centerArea}>
        <AudioWaveformIcon />
        {source?.title && (
          <>
            <Text style={styles.centerTitle}>{source.title}</Text>
            <Text style={styles.centerMeta}>{getSourceMeta(source)}</Text>
          </>
        )}
        <TouchableOpacity style={styles.generateBtn} onPress={onGenerateAudio}>
          <Text style={styles.generateBtnText}>Generate Audio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AudioWaveformIcon() {
  // Larger SVG-like waveform using Views
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: 28,
      }}
    >
      <View
        style={{
          width: 6,
          height: 32,
          backgroundColor: "#1976d2",
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 48,
          backgroundColor: "#1976d2",
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 26,
          backgroundColor: "#1976d2",
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 58,
          backgroundColor: "#1976d2",
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 38,
          backgroundColor: "#1976d2",
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 20,
          backgroundColor: "#1976d2",
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 48,
          backgroundColor: "#1976d2",
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
    </View>
  );
}

function getSourceMeta(source) {
  if (!source) return "";
  // For now, always '1 source'.
  let meta = "1 source";
  // Check if latest (addedDate is today or 'latest' flag)
  if (
    source.addedDate &&
    (source.addedDate.toLowerCase().includes("today") ||
      source.addedDate.toLowerCase().includes("latest"))
  ) {
    meta += " · latest";
  }
  return meta;
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
  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  generateBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  generateBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centerTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  centerMeta: {
    fontSize: 13,
    color: "#888",
    marginBottom: 24,
    textAlign: "center",
  },
});

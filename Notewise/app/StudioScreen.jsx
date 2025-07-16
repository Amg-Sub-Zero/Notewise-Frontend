import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./theme";

export default function StudioScreen({ source, onBack, onGenerateAudio }) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState(false);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
            {source?.title || "Studio"}
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
              }}
            >
              <Text style={{ color: "red", fontSize: 16 }}>
                Delete Notebook
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Centered Title and Generate Audio Button */}
      <View style={styles.centerArea}>
        <AudioWaveformIcon color={theme.primary} />
        {source?.title && (
          <>
            <Text style={[styles.centerTitle, { color: theme.text }]}>
              {source.title}
            </Text>
            <Text style={[styles.centerMeta, { color: theme.text }]}>
              {getSourceMeta(source)}
            </Text>
          </>
        )}
        <TouchableOpacity
          style={[styles.generateBtn, { backgroundColor: "#3f66fb" }]}
          onPress={onGenerateAudio}
        >
          <Text style={[styles.generateBtnText, { color: "#fff" }]}>
            Generate Audio
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AudioWaveformIcon({ color = "#1976d2" }) {
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
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 48,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 26,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 58,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 38,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 20,
          backgroundColor: color,
          borderRadius: 3,
          marginHorizontal: 3,
        }}
      />
      <View
        style={{
          width: 6,
          height: 48,
          backgroundColor: color,
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
  },
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
  headerType: {
    fontSize: 13,
    marginTop: 2,
  },
  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  generateBtn: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  generateBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centerTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 24,
    textAlign: "center",
  },
  centerMeta: {
    fontSize: 13,
    marginBottom: 24,
    textAlign: "center",
  },
});

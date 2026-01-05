import { useNotes } from "@/storage/notesContext";
import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddNotePage: React.FC = () => {
  const { addNote } = useNotes();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const savedRef = useRef(false);
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const addNoteRef = useRef(addNote);

  useEffect(() => {
    titleRef.current = title;
  }, [title]);
  useEffect(() => {
    contentRef.current = content;
  }, [content]);
  useEffect(() => {
    addNoteRef.current = addNote;
  }, [addNote]);

  const saveAndBack = () => {
    if (!title.trim() && !content.trim()) {
      router.back();
      return;
    }
    if (!savedRef.current) {
      addNote({ title: title.trim(), content: content.trim() });
      savedRef.current = true;
    }
    router.back();
  };

  // save on unmount as a fallback (e.g., hardware back) — use refs so cleanup only runs on unmount
  useEffect(() => {
    return () => {
      if (savedRef.current) return;
      const t = titleRef.current.trim();
      const c = contentRef.current.trim();
      if (!t && !c) return;
      addNoteRef.current({ title: t, content: c });
    };
  }, []);

  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={["top", "bottom"]}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={saveAndBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.header, { color: theme.text }]}>New Note</Text>
        </View>

        <View style={styles.inner}>
          <TextInput
            style={[styles.title, { color: theme.text }]}
            placeholder="Title"
            placeholderTextColor={theme.text + "88"}
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
          <TextInput
            style={[styles.content, { color: theme.text }]}
            placeholder="Write something..."
            placeholderTextColor={theme.text + "88"}
            value={content}
            onChangeText={setContent}
            multiline
          />

          <Text style={[styles.hint, { color: theme.text + "88" }]}>Saved when going back</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  inner: { padding: 16, flex: 1 },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#0f172a" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8, paddingVertical: 6 },
  content: { flex: 1, textAlignVertical: "top", fontSize: 16, paddingTop: 8, paddingBottom: 8 },
  saveBtn: {
    backgroundColor: "#4682BF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  saveText: { color: "#fff", fontWeight: "700" },
  hint: { fontSize: 12, color: "#64748b", marginTop: 8 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
  },
});

export default AddNotePage;

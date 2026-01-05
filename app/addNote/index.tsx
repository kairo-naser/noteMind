import { useNotes } from "@/storage/notesContext";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AUTO_SAVE_DELAY = 800; // ms

const AddNotePage: React.FC = () => {
  const { addNote } = useNotes();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const timerRef = useRef<number | null>(null);
  const savedRef = useRef(false);

  // debounce auto-save: when typing stops, save and go back
  useEffect(() => {
    if (savedRef.current) return;
    if (!title.trim() && !content.trim()) return;
    if (timerRef.current) clearTimeout(timerRef.current as any);
    // @ts-ignore setTimeout returns number
    timerRef.current = setTimeout(() => {
      addNote({ title: title.trim(), content: content.trim() });
      savedRef.current = true;
      router.back();
    }, AUTO_SAVE_DELAY) as unknown as number;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current as any);
    };
  }, [title, content, addNote, router]);

  // also save on unmount if not yet saved
  useEffect(() => {
    return () => {
      if (savedRef.current) return;
      if (!title.trim() && !content.trim()) return;
      addNote({ title: title.trim(), content: content.trim() });
    };
  }, [title, content, addNote]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}>
        <View style={styles.inner}>
          <Text style={styles.header}>New Note</Text>
          <TextInput
            style={styles.title}
            placeholder="Title"
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
          <TextInput
            style={styles.content}
            placeholder="Write something..."
            placeholderTextColor="#94a3b8"
            value={content}
            onChangeText={setContent}
            multiline
          />

          <Text style={styles.hint}>Auto-saving when you stop typing…</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
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
});

export default AddNotePage;

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useNotes } from "@/storage/notesContext";

const EditNotePage: React.FC = () => {
  const params = useLocalSearchParams();
  const id = (params.id as string) || "";
  const { notes, updateNote } = useNotes();
  const note = notes.find((n) => n.id === id);

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    }
  }, [note]);

  // debounce update
  useEffect(() => {
    if (!note) return;
    if (timerRef.current) clearTimeout(timerRef.current as any);
    // @ts-ignore
    timerRef.current = setTimeout(() => {
      updateNote(id, { title, content });
    }, 600) as unknown as number;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current as any);
    };
  }, [title, content, id, note, updateNote]);

  if (!note) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Note not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}>
        <View style={styles.inner}>
          <Text style={styles.header}>Edit Note</Text>
          <TextInput style={styles.title} value={title} onChangeText={setTitle} placeholder="Title" placeholderTextColor="#94a3b8" />
          <TextInput style={styles.content} value={content} onChangeText={setContent} placeholder="Content" multiline placeholderTextColor="#94a3b8" />
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
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  content: { flex: 1, textAlignVertical: "top", fontSize: 16 },
});

export default EditNotePage;

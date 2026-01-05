import { useNotes } from "@/storage/notesContext";
import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditNotePage: React.FC = () => {
  const params = useLocalSearchParams();
  const id = (params.id as string) || "";
  const { notes, updateNote } = useNotes();
  const note = notes.find((n) => n.id === id);

  const router = useRouter();
  const { theme } = useTheme();
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const savedRef = useRef(false);
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const updateNoteRef = useRef(updateNote);

  useEffect(() => {
    titleRef.current = title;
  }, [title]);
  useEffect(() => {
    contentRef.current = content;
  }, [content]);
  useEffect(() => {
    updateNoteRef.current = updateNote;
  }, [updateNote]);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    }
  }, [note]);

  const saveAndBack = () => {
    if (!note) {
      router.back();
      return;
    }
    if (!savedRef.current) {
      updateNote(id, { title, content });
      savedRef.current = true;
    }
    router.back();
  };

  useEffect(() => {
    // run only on unmount: use refs to access latest values
    return () => {
      if (savedRef.current) return;
      if (!note) return;
      const t = titleRef.current;
      const c = contentRef.current;
      if (!t && !c) return;
      updateNoteRef.current(id, { title: t, content: c });
    };
    // empty deps so cleanup only runs on unmount
  }, []);

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={["top", "bottom"]}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}>
        <View style={[styles.headerRow, { backgroundColor: theme.card }]}> 
          <TouchableOpacity onPress={saveAndBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.header, { color: theme.text }]}>Edit Note</Text>
        </View>

        <View style={styles.inner}>
          <TextInput style={[styles.title, { color: theme.text }]} value={title} onChangeText={setTitle} placeholder="Title" placeholderTextColor="#94a3b8" />
          <TextInput style={[styles.content, { color: theme.text }]} value={content} onChangeText={setContent} placeholder="Content" multiline placeholderTextColor="#94a3b8" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  inner: { padding: 16, flex: 1 },
  headerRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingTop: 10, paddingBottom: 6 },
  backBtn: { padding: 6, marginRight: 6 },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  content: { flex: 1, textAlignVertical: "top", fontSize: 16 },
});

export default EditNotePage;

import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Note = {
  id: string;
  title: string;
  content?: string;
};

const NoteCard: React.FC<{
  note: Note;
  onPress?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
}> = ({ note, onPress, onLongPress, selected = false }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} activeOpacity={0.9}>
      <View style={[styles.card, { backgroundColor: theme.card }, selected && { backgroundColor: theme.accent }]}> 
        {selected ? (
          <View style={styles.checkWrap}>
            <Ionicons name="checkmark" size={18} color="#fff" />
          </View>
        ) : null}
        <Text numberOfLines={2} style={[styles.title, { color: selected ? "#fff" : theme.text }]}>{note.title}</Text>
        {note.content ? (
          <Text numberOfLines={6} style={[styles.content, { color: selected ? "#fff" : theme.text }]}>
            {note.content}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flex: 1,
    minHeight: 80,
    maxHeight: 180,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardSelected: {
    backgroundColor: "#0ea5a4",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 6,
  },
  content: {
    fontSize: 13,
    color: "#475569",
  },
  checkWrap: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NoteCard;

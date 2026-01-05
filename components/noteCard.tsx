import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Note = {
  id: string;
  title: string;
  content?: string;
};

const NoteCard: React.FC<{ note: Note; onPress?: () => void; onLongPress?: () => void }> = ({ note, onPress, onLongPress }) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} activeOpacity={0.9}>
      <View style={styles.card}>
      <Text style={styles.title}>{note.title}</Text>
      {note.content ? <Text style={styles.content}>{note.content}</Text> : null}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
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
});

export default NoteCard;

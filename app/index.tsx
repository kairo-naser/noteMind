import FloatingAddBtn from "@/components/floatingAddBtn";
import Header from "@/components/header";
import OptionsModal from "@/components/optionsModel";
import BottomTabsNav from "@/navigation/bottomTabs";
import { useNotes } from "@/storage/notesContext";
import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NoteCard from "../components/noteCard";
const SearchBar = require("../components/searchBar").default;



export default function Index() {
  const { theme } = useTheme();
  const [searchItem, setSearchItem] = useState("");
  const { notes, deleteNote, deleteNotes } = useNotes();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();

  const timer = useRef<number | null>(null);
  const debouncedSearch = useCallback((val: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSearchItem(val), 220) as unknown as number;
  }, []);

  const filtered = useMemo(() => {
    const q = searchItem.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || (n.content || "").toLowerCase().includes(q)
    );
  }, [notes, searchItem]);

  const inSelectionMode = selectedIds.length > 0;

  const onPressCard = (id: string) => {
    if (inSelectionMode) {
      setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
      return;
    }
    router.push(`/editNotePage?id=${id}` as any);
  };

  const onLongPressCard = (id: string) => {
    // enter selection mode and select this
    setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.columnWrapper}>
      <NoteCard
        note={item}
        onPress={() => onPressCard(item.id)}
        onLongPress={() => onLongPressCard(item.id)}
        selected={selectedIds.includes(item.id)}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Header />

      <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} debouncedSearch={debouncedSearch} />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      <BottomTabsNav />
      <FloatingAddBtn />

      {/* selection toolbar */}
      {inSelectionMode ? (
        <View style={[styles.selectionBar, { backgroundColor: theme.accent }]}> 
          <Text style={[styles.selectionCount, { color: "#fff" }]}>{selectedIds.length} selected</Text>
          <View style={styles.selectionActions}>
            {selectedIds.length === 1 ? (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => {
                  router.push(`/editNotePage?id=${selectedIds[0]}` as any);
                  setSelectedIds([]);
                }}
              >
                <Ionicons name="pencil" size={20} color="#fff" />
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => {
                const { Alert } = require("react-native");
                Alert.alert(
                  "Delete notes",
                  `Are you sure you want to delete ${selectedIds.length} selected notes?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => {
                        deleteNotes(selectedIds);
                        setSelectedIds([]);
                      },
                    },
                  ]
                );
              }}
            >
              <Ionicons name="trash" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={() => setSelectedIds([])}>
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <OptionsModal
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        onDelete={() => {
          if (selectedIds.length === 1) deleteNote(selectedIds[0]);
          setOptionsVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === "android" ? 12 : 18,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110, // leave space for bottom tab
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  columnWrapper: {
    flex: 1,
    paddingHorizontal: 6,
  },
  card: {
    
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 14,
  },
  selectionBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 72,
    
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  selectionCount: { fontWeight: "600", color: "#0f172a" },
  selectionActions: { flexDirection: "row", alignItems: "center" },
  actionBtn: { paddingHorizontal: 10, paddingVertical: 6 },
});

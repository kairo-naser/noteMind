import FloatingAddBtn from "@/components/floatingAddBtn";
import Header from "@/components/header";
import BottomTabsNav from "@/navigation/bottomTabs";
import { useNotes } from "@/storage/notesContext";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import NoteCard from "../components/noteCard";
import OptionsModal from "@/components/optionsModel";
import { useRouter } from "expo-router";
// require the SearchBar to avoid potential default export resolution issues
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SearchBar = require("../components/searchBar").default;



export default function Index() {
  const [searchItem, setSearchItem] = useState("");
  const { notes, deleteNote } = useNotes();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const timer = useRef<number | null>(null);
  const debouncedSearch = useCallback((val: string) => {
    if (timer.current) clearTimeout(timer.current);
    // @ts-ignore
    timer.current = setTimeout(() => setSearchItem(val), 220) as unknown as number;
  }, []);

  const filtered = useMemo(() => {
    const q = searchItem.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || (n.content || "").toLowerCase().includes(q)
    );
  }, [notes, searchItem]);

  const onPressCard = (id: string) => {
    router.push(`/editNotePage?id=${id}` as any);
  };

  const onLongPressCard = (id: string) => {
    setSelectedId(id);
    setOptionsVisible(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.columnWrapper}>
      <NoteCard note={item} onPress={() => onPressCard(item.id)} onLongPress={() => onLongPressCard(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />

      <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} debouncedSearch={debouncedSearch} />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      <BottomTabsNav />
      <FloatingAddBtn />

      <OptionsModal
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        onDelete={() => {
          if (selectedId) deleteNote(selectedId);
          setOptionsVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
    backgroundColor: "#fff",
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
    color: "#0f172a",
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 14,
    color: "#334155",
  },
});

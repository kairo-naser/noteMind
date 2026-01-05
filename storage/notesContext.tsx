import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import INITIAL_NOTES, { Note as StoredNote } from "./notesStorage";

/**
 * Note type used across the app (kept in storage/notesStorage.ts)
 */
type Note = StoredNote;

/** Public shape of the Notes context */
type NotesContextValue = {
  notes: Note[];
  addNote: (note: Omit<Note, "id">) => void;
  updateNote: (id: string, patch: Partial<Omit<Note, "id">>) => void;
  deleteNote: (id: string) => void;
  deleteNotes: (ids: string[]) => void;
};

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

const STORAGE_KEY = "@noteMind:notes";

/**
 * NotesProvider: loads notes from AsyncStorage and persists changes.
 * Keeps the public API simple: addNote, updateNote, deleteNote(s).
 */
export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load saved notes once on mount. If nothing stored, use INITIAL_NOTES.
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!mounted) return;
        if (raw) {
          setNotes(JSON.parse(raw));
        } else {
          setNotes(INITIAL_NOTES || []);
        }
      } catch (e) {
        console.warn("Failed to load notes:", e);
        setNotes(INITIAL_NOTES || []);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Persist notes whenever they change.
  useEffect(() => {
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.warn("Failed to save notes:", e);
      }
    }
    save();
  }, [notes]);

  /** Add a new note (placed at the top) */
  const addNote = (note: Omit<Note, "id">) => {
    const newNote: Note = { id: Date.now().toString(), ...note };
    setNotes((s) => [newNote, ...s]);
  };

  /** Update an existing note by id */
  const updateNote = (id: string, patch: Partial<Omit<Note, "id">>) => {
    setNotes((s) => s.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  };

  /** Delete a single note by id */
  const deleteNote = (id: string) => {
    setNotes((s) => s.filter((n) => n.id !== id));
  };

  /** Delete multiple notes */
  const deleteNotes = (ids: string[]) => {
    const idSet = new Set(ids);
    setNotes((s) => s.filter((n) => !idSet.has(n.id)));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, deleteNotes }}>{children}</NotesContext.Provider>
  );
};

/** Hook to access notes context */
export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
};

export default NotesContext;

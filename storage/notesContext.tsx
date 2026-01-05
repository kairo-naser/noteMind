import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import INITIAL_NOTES, { Note as StoredNote } from "./notesStorage";

type Note = StoredNote;

type NotesContextValue = {
  notes: Note[];
  addNote: (note: Omit<Note, "id">) => void;
  updateNote: (id: string, patch: Partial<Omit<Note, "id">>) => void;
  deleteNote: (id: string) => void;
  deleteNotes: (ids: string[]) => void;
};

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const STORAGE_KEY = "@noteMind:notes";

  // load notes from AsyncStorage on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
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
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // persist notes whenever they change
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.warn("Failed to save notes:", e);
      }
    })();
  }, [notes]);

  const addNote = (note: Omit<Note, "id">) => {
    const newNote: Note = { id: Date.now().toString(), ...note };
    setNotes((s) => [newNote, ...s]);
  };

  const updateNote = (id: string, patch: Partial<Omit<Note, "id">>) => {
    setNotes((s) => s.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  };

  const deleteNote = (id: string) => {
    setNotes((s) => s.filter((n) => n.id !== id));
  };

  const deleteNotes = (ids: string[]) => {
    const idSet = new Set(ids);
    setNotes((s) => s.filter((n) => !idSet.has(n.id)));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, deleteNotes }}>{children}</NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
};

export default NotesContext;

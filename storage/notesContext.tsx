import React, { createContext, useContext, useState } from "react";
import INITIAL_NOTES, { Note as StoredNote } from "./notesStorage";

type Note = StoredNote;

type NotesContextValue = {
  notes: Note[];
  addNote: (note: Omit<Note, "id">) => void;
  updateNote: (id: string, patch: Partial<Omit<Note, "id">>) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

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

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>{children}</NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
};

export default NotesContext;

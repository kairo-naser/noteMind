import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NotesProvider } from "@/storage/notesContext";

export default function RootLayout() {
  return (
    <NotesProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="setting/index" options={{ headerShown: false }} />
        <Stack.Screen name="addNote/index" options={{ headerShown: false }} />
      </Stack>
    </NotesProvider>
  );
}

import { NotesProvider } from "@/storage/notesContext";
import { ThemeProvider, useTheme } from "@/theme/themeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

function AppStack() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={(theme.statusBar as any) || "dark"} />
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="setting/index" options={{ headerShown: false }} />
        <Stack.Screen name="addNote/index" options={{ headerShown: false }} />
        <Stack.Screen name="editNotePage/index" options={{ headerShown: false }} />
        <Stack.Screen name="setting/privacy" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <AppStack />
      </NotesProvider>
    </ThemeProvider>
  );
}

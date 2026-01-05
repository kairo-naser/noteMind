import React, { createContext, useContext, useMemo, useState } from "react";
import dark from "./dark";
import light from "./light";

type Theme = typeof light;

type ThemeContextValue = {
  theme: Theme;
  mode: "light" | "dark";
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => (mode === "light" ? light : dark), [mode]);
  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return React.createElement(ThemeContext.Provider, { value: { theme: theme as Theme, mode, toggle } }, children);
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default ThemeContext;

import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

/**
 * Floating action button that navigates to the Add Note screen.
 */
const FloatingAddBtn: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <TouchableOpacity
        accessibilityLabel="Add note"
        testID="fab-add"
        style={[styles.button, { backgroundColor: theme.accent }]}
        activeOpacity={0.85}
        onPress={() => router.push('/addNote')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 20,
    bottom: 80,
    zIndex: 50,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 6,
  },
});

export default FloatingAddBtn;

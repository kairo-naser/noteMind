import { useTheme } from "@/theme/themeContext";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header: React.FC = () => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.accent }}>
      <View style={[styles.container, { backgroundColor: theme.accent }]}> 
        <Text style={[styles.title, { color: '#fff' }]}>noteMind</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 18 : 36,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
});

export default Header;

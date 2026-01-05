import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header: React.FC = () => {
  return (
    <SafeAreaView><View style={styles.container}>
      <Text style={styles.title}>noteMind</Text>
    </View></SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 18 : 36,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: "#5990c7b2",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffffff",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
});

export default Header;

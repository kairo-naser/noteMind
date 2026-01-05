import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const FloatingAddBtn: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => router.push('/addNote' as any)}
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
    backgroundColor: "#4682BF",
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
